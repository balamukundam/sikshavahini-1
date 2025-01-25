import Message from "./Message";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import { useState } from "react";
import Navbar from "./components/Navbar";
import NavMenu from "./components/NavMenu";
import { BmkLanguage, BmkLanguages } from "./services/dataTypes";
import { downloadData } from "./services/downloadUtils";
import React from "react";
import { EngToTelService } from "./services/engToTelugu";
import TitleInput from "./components/TitleInput";
import RowsDesign from "./components/RowsDesign";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [titleLesson, setTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState([]);

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
          setDataRows(parsedJson?.dataRows || []);
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

  const getLocalLanguage = (item: string) => {
    setTitleLesson(item);
  };

  const handleDownload = () => {
    const dataToExport = {
      titleLesson: titleLesson,
      dataRows: dataRows,
    };

    downloadData(dataToExport);
    setAlertStatus("JSON file Downloaded", true, true);
  };

  const [jsonData, setJsonData] = useState(null);

  const [alertVisible, setAlertVisibility] = useState(false);
  const [alertText, setAlertText] = useState("Alert");
  const [alertColor, setAlertColor] = useState("primary");

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
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-3">
          <div className={"card bg-light mb-4 me-1 div-" + curLang + "gen"}>
            <div className="card-header text-center">Design</div>
            <div className="card-body">
              <TitleInput
                value={titleLesson}
                onTitleChange={handleTitle}
              ></TitleInput>

              <RowsDesign initialDataRows={dataRows}></RowsDesign>
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
      </div>

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
