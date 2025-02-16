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
  ComponentImage,
  ComponentPara,
  ComponentSeparator,
} from "./services/dataTypes";
import { downloadData } from "./services/downloadUtils";
import React from "react";
import { EngToTelService } from "./services/engToTelugu";
import TitleInput from "./components/TitleInput";
import RowsDesign from "./components/RowsDesign";
import RowPreview from "./components/RowPreview";
import RowInput from "./components/RowInput";
import PreviewParaComponent from "./components/PreviewParaComponent";
import Button from "./components/Button";
import logotelugu from "/public/images/Bpic-2.png";
import HelpPage from "./components/HelpPage";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [titleLesson, setTitleLesson] = useState("");
  const [subTitleLesson, setSubTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState<DataRow[]>([]);

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
  const [selectedScreen, setSelectedScreen] = useState("Design");

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
  function getNewSeperatorCompObject(): ComponentSeparator {
    return {
      width: "3",
      cType: "99",
      sepType: "curve",
    };
  }

  function getNewImageCompObject(): ComponentImage {
    return {
      width: "3",
      cType: "1",
      image: logotelugu,
      title: "bAlamukuMdamu",
    };
  }
  function getNewParaCompObject(cType: string): ComponentPara {
    return {
      image: logotelugu,
      width: "12",
      cType: cType,
      floatDirection: "left",
      imageWidth: "30%",
      lines: [
        "ayOdhyaa nagaraaniki mahArAju daSarathuDu.",
        "okarOju daSarathuDu vETa koraku aDaviki veLLenu.",
        "aMtalO rAtri ayiMdi. caMdruDu AkASaMlO prakASistunnADu.",
      ],
      title: "",
    };
  }

  function getComponent(newComponentType: string): ComponentType {
    switch (newComponentType) {
      case "Image component":
        return getNewImageCompObject();
      case "Para component":
        return getNewParaCompObject("2");
      case "Numbered comp":
        return getNewParaCompObject("3");
      case "Bullet comp":
        return getNewParaCompObject("4");
      case "Seperator comp":
        return getNewSeperatorCompObject();
      default:
        return getNewImageCompObject();
    }
  }

  function addComponent(rowIndex: number, newComponentType: string) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              components: [...row.components, getComponent(newComponentType)],
            }
          : row
      )
    );
  }

  function insertComponent(
    rowIndex: number,
    compIndex: number,
    newComponentType: string
  ) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              components: [
                ...row.components.slice(0, compIndex), // Keep components before 'compIndex'
                getComponent(newComponentType), // Insert new component
                ...row.components.slice(compIndex), // Keep components after 'compIndex'
              ],
            }
          : row
      )
    );
  }

  function deleteComponent(rowIndex: number, compIndex: number) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              components: row.components.filter(
                (_, cIdx) => cIdx !== compIndex - 1
              ),
            }
          : row
      )
    );
  }

  function moveComponent(rowIndex: number, compIndex: number) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) => {
        if (rIdx !== rowIndex || compIndex === 0) return row; // Ignore if first component

        const updatedComponents = [...row.components];

        // Swap components at compIndex and compIndex - 1
        [updatedComponents[compIndex - 2], updatedComponents[compIndex - 1]] = [
          updatedComponents[compIndex - 1],
          updatedComponents[compIndex - 2],
        ];

        return { ...row, components: updatedComponents };
      })
    );
  }

  function moveRow(rowIndex: number) {
    setDataRows((prevRows) => {
      if (rowIndex <= 0) return prevRows; // Don't do anything if it's the first row
      const newRows = [...prevRows];
      // Swap the row at rowIndex with the one before it (rowIndex - 1)
      [newRows[rowIndex - 1], newRows[rowIndex]] = [
        newRows[rowIndex],
        newRows[rowIndex - 1],
      ];
      return newRows;
    });
  }

  function addRow() {
    setDataRows((prevRows) => [
      ...prevRows,
      {
        preferences: { title: "", language: "Default", endline: "solid" },
        components: [],
      },
    ]);
  }

  function deleteRow(rowIndex: number) {
    setDataRows((prevRows) => prevRows.filter((_, rIdx) => rIdx !== rowIndex));
  }

  function preferencesUpdate(rowIndex: number, updatedPreferences: any) {
    setDataRows((prevRows) =>
      prevRows.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              preferences: updatedPreferences,
            }
          : row
      )
    );
  }

  function onSelectScreen(screen: string) {
    setSelectedScreen(screen);
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
        onSelectScreen={onSelectScreen}
      ></NavMenu>
      {selectedScreen == "Design" && (
        <>
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
                addComponent={addComponent}
                insertComponent={insertComponent}
                moveComponent={moveComponent}
                deleteComponent={deleteComponent}
                moveRow={moveRow}
                deleteRow={deleteRow}
                curLang={curLang}
                preferencesUpdate={preferencesUpdate}
              ></RowsDesign>
              <div className="row" style={{ marginBottom: "25px" }}>
                <div className="col-1">
                  <Button color="primary" symbol="➕" onClick={addRow}>
                    Add Row
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
        </>
      )}

      {selectedScreen == "Preview" && (
        <>
          <div className={"card bg-light mb-4 me-1"}>
            <div className="card-header text-center">Preview</div>
            <div className="card-body"></div>
          </div>
        </>
      )}
      {selectedScreen == "Help" && (
        <>
          <div className={"card bg-light mb-4 me-1"}>
            <div className="card-header text-center">Help</div>
            <div className="card-body">
              <HelpPage></HelpPage>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
