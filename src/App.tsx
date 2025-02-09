import Message from "./Message";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import { useState } from "react";
import Navbar from "./components/Navbar";
import NavMenu from "./components/NavMenu";
import {
  BmkLanguage,
  BmkLanguages,
  DataRow,
  ComponentType,
} from "./services/dataTypes";
import { downloadData } from "./services/downloadUtils";
import React from "react";
import { EngToTelService } from "./services/engToTelugu";
import TitleInput from "./components/TitleInput";
import RowsDesign from "./components/RowsDesign";
import RowPreview from "./components/RowPreview";
import RowInput from "./components/RowInput";
import PreviewParaComponent from "./components/PreviewParaComponent";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [titleLesson, setTitleLesson] = useState("");
  const [subTitleLesson, setSubTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState<DataRow[]>([
    {
      components: [
        {
          width: "3",
          cType: "1",
          image:
            "https://www.boloji.com/articlephotos/Introduction%20to%20Ramayana1.jpg",
          title: "daSarathuDu",
        },
      ],
    },
  ]);

  const handleLanguageSelectItem = (item: string) => {
    item === "Sanskrit"
      ? setLanguage(BmkLanguages.devanagari)
      : setLanguage(BmkLanguages.telugu);

    setAlertStatus("Language: " + item, true, true);
  };

  const setAlertStatus = (
    alertText = "",
    isValid = false,
    isVisible = false
  ) => {
    setAlertVisibility(isVisible);
    setAlertText(alertText);
    isValid ? setAlertColor("primary") : setAlertColor("danger");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertStatus();
    const files = event.target.files;

    if (files && files[0].type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedJson = JSON.parse(e.target?.result as string);
          setJsonData(parsedJson);
          setTitleLesson(parsedJson?.titleLesson || "");

          //setDataRows(parsedJson?.dataRows ? [...parsedJson.dataRows] : []);
          setSubTitleLesson(parsedJson?.subTitleLesson || "");
          setDataRows((prevRows) => parsedJson?.dataRows || []);
          //addData(parsedJson?.dataRows[0]);
          //setDataRows(parsedJson?.dataRows);

          console.log("fulljson", parsedJson?.dataRows);
          console.log("Data read from json", dataRows);

          setAlertStatus("JSON file loaded!", true, true);
        } catch (error) {
          setAlertStatus("Invalid file type!", false, true);
        }
      };
      reader.readAsText(files[0]);

      //files[0].name
    } else {
      setAlertStatus("Invalid file type!", false, true);
    }
  };

  const handleTitle = (item: string) => {
    setTitleLesson(item);
  };

  const handleSubTitle = (item: string) => {
    setSubTitleLesson(item);
  };

  const handleRows = (rows: any[]) => {
    setDataRows(rows);

    console.log("rows", rows);
    console.log("updatig...");
    console.log("datarows", dataRows);
  };

  const getTestInLocalLanguage = (item: string) => {
    return ett.getStringInUserLanguage(curLang, item);
  };

  const handleDownload = () => {
    const dataToExport = {
      titleLesson: titleLesson,
      subTitleLesson: subTitleLesson,
      dataRows: dataRows,
    };

    downloadData(dataToExport);
    setAlertStatus("JSON file Downloaded", true, true);
  };

  const [jsonData, setJsonData] = useState(null);

  const [alertVisible, setAlertVisibility] = useState(false);
  const [alertText, setAlertText] = useState("Alert");
  const [alertColor, setAlertColor] = useState("primary");

  const addData1 = () => {
    let dr = { components: [] };
    let newArry = dataRows;
    newArry.push(dr);
    setDataRows(newArry);
    console.log(dataRows);
  };

  const addData = (dr: DataRow) => {
    // Create a new array reference to update state
    //let dr = { components: [] };
    console.log("dr", dr);
    setDataRows((prevRows) => [...prevRows, dr]);
    let dr1 = { components: [] };
    setDataRows((prevRows) => [...prevRows, dr1]);
  };

  const row1Changed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRows = dataRows.map((row, rIdx) => ({
      ...row,
      components: row.components.map((component, cIdx) =>
        rIdx === 0 && cIdx === 0
          ? { ...component, title: event.target.value } // Create new object instead of modifying
          : component
      ),
    }));
    setDataRows(updatedRows); // Set new state

    console.log(dataRows);
  };

  const handleInputChange = (
    rowIndex: number,
    compIndex: number,
    fieldName: keyof ComponentType,
    newValue: any
  ) => {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) => ({
        ...row,
        components: row.components.map((component, cIdx) =>
          rIdx === rowIndex && cIdx === compIndex
            ? { ...component, [fieldName]: newValue }
            : component
        ),
      }))
    );
  };

  function updateComponent(
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) => ({
        ...row,
        components: row.components.map((component, cIdx) =>
          rIdx === rowIndex && cIdx === compIndex ? updatedComponent : component
        ),
      }))
    );
  }

  return (
    <div
      className="container-fluid"
      style={{ minWidth: "210mm", width: "90%" }}
    >
      <Navbar lang={curLang}></Navbar>

      <NavMenu
        onSelectLanguage={handleLanguageSelectItem}
        handleFileChange={handleFileChange}
        handleDownload={handleDownload}
      ></NavMenu>
      {alertVisible && <Alert text={alertText} color={alertColor}></Alert>}

      <div className={"card bg-light mb-4 me-1"}>
        <div className="card-header text-center">Design</div>
        <div className="card-body">
          <div className="row" style={{ marginBottom: "25px" }}>
            <div className="col-1">
              <TitleInput
                titleText={titleLesson}
                subTitleText={subTitleLesson}
                onTitleChange={handleTitle}
                onSubTitleChange={handleSubTitle}
              ></TitleInput>
            </div>
            <div className={"col-11 div-" + curLang + "gen fontup"}>
              <p className="text-center fontup2">
                {getTestInLocalLanguage(titleLesson)}
              </p>
              {subTitleLesson !== "" && (
                <p className="text-center">
                  {getTestInLocalLanguage(subTitleLesson)}
                </p>
              )}
            </div>
          </div>

          <RowsDesign
            initialDataRows={dataRows}
            onDataUpdate={updateComponent}
            curLang={curLang}
          ></RowsDesign>
        </div>
      </div>

      <input
        type="text"
        className="form-control"
        placeholder="Title"
        aria-label="Title"
        aria-describedby="subtitle-input"
        id="inputField"
        value={dataRows[0]["components"][0]["title"]}
        onChange={(e) => handleInputChange(0, 0, "title", e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Title"
        aria-label="Title"
        aria-describedby="subtitle-input"
        id="inputField"
        value={dataRows[0]["components"][0]["width"]}
        onChange={(e) => handleInputChange(0, 0, "width", e.target.value)}
      />
      {/* 
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-3">
          <div className={"card bg-light mb-4 me-1 div-" + curLang + "gen"}>
            <div className="card-header text-center">Design</div>
            <div className="card-body">
              <RowsDesign
                initialDataRows={dataRows}
                curLang={curLang}
                onDataUpdate={handleRows}
              ></RowsDesign>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className={"card bg-light ms-1 mb-4 div-" + curLang + "gen"}>
            <div className="card-header text-center">Preview</div>
            <div className="card-body">
              <p className="text-center fontup2">
                {curLang === BmkLanguages.telugu
                  ? ett.getStringInTelugu(titleLesson)
                  : ett.getStringInSanskrit(titleLesson)}
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Hello World{" "}
          <p>
            ab<b>seer</b>cd
          </p>
        </Alert>
      )}

      <Button
        color="danger"
        onClick={() => {
          console.log("Clicked");
          setAlertVisibility(true);
        }}
      >
        My Button
      </Button>

      <ListGroup
        items={items1}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <ListGroup
        items={items2}
        heading="Names"
        onSelectItem={handleSelectItem}
      /> */}
    </div>
  );
}

export default App;
