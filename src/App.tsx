import Message from "./Message";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
import Navbar from "./components/Navbar";
import NavMenu from "./components/NavMenu";
import { BmkLanguage, BmkLanguages } from "./services/dataTypes";

import React from "react";
import { EngToTelService } from "./services/engToTelugu";
import TitleInput from "./components/TitleInput";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [titleLesson, setTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState([]);

  const handleLanguageSelectItem = (item: string) => {
    if (item == "Sanskrit") {
      setLanguage(BmkLanguages.devanagari);
    } else {
      setLanguage(BmkLanguages.telugu);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0].type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedJson = JSON.parse(e.target?.result as string);
          setJsonData(parsedJson);
          setTitleLesson(parsedJson?.titleLesson || "");
          setAlertVisibility(true);
          setAlertText("JSON file loaded!");
          setAlertColor("primary");
        } catch (error) {
          setAlertVisibility(true);
          setAlertText("Invalid file type!");
          setAlertColor("danger");
        }
      };
      reader.readAsText(files[0]);

      //files[0].name
    } else {
      setAlertVisibility(true);
      setAlertText("Invalid file type!");
      setAlertColor("danger");
    }
  };

  const handleTitle = (item: string) => {
    setTitleLesson(item);
  };

  const getLocalLanguage = (item: string) => {
    setTitleLesson(item);
  };

  const handleDownload = () => {
    console.log("Download");
    const dataToExport = {
      titleLesson: titleLesson,
    };
    const jsonString = JSON.stringify(dataToExport, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json"; // Set the file name

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-3">
          <div className={"card bg-light mb-4 me-1 div-" + curLang + "gen"}>
            <div className="card-header text-center">Design</div>
            <div className="card-body">
              {alertVisible && (
                <Alert text={alertText} color={alertColor}></Alert>
              )}
              <TitleInput
                value={titleLesson}
                onTitleChange={handleTitle}
              ></TitleInput>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className={"card bg-light ms-1 mb-4 div-" + curLang + "gen"}>
            <div className="card-header text-center">Preview</div>
            <div className="card-body">
              <p className="text-center fontup2">
                {curLang === "telugu"
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
