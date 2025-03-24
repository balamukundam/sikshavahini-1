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
  ComponentPoem,
  ComponentTable,
  ComponentMultiQuest,
  ComponentMusicNotes,
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
import logotelugu from "/images/Bpic-2.png";
import HelpPage from "./components/HelpPage";
import DictionaryComponent from "./components/DictionaryComponent";
import TaragatiSelector from "./components/TaragatiSelector";
import ToneComponent from "./components/ToneComponent";
import MusicNotesComponent from "./components/PreviewMusicNotesComponent";
import TalamComponent from "./components/TalamComponent";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [titleLesson, setTitleLesson] = useState("");
  const [subTitleLesson, setSubTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState<DataRow[]>([]);

  const handleLanguageSelectItem = (item: string) => {
    switch (item) {
      case "Transcription":
        setLanguage(BmkLanguages.transcription);
        break;
      case "Sanskrit":
        setLanguage(BmkLanguages.devanagari);
        break;
      default:
        setLanguage(BmkLanguages.telugu);
        break;
    }

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
          if (titleLesson !== "") setDictionaryText(titleLesson);

          //setDataRows(parsedJson?.dataRows ? [...parsedJson.dataRows] : []);
          setSubTitleLesson(parsedJson?.subTitleLesson || "");
          setDataRows((prevRows) => parsedJson?.dataRows || []);
          //addData(parsedJson?.dataRows[0]);
          //setDataRows(parsedJson?.dataRows);

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
    if (item !== "") setDictionaryText(item);
  };

  const handleSubTitle = (item: string) => {
    setSubTitleLesson(item);
  };

  const handleRows = (rows: any[]) => {
    setDataRows(rows);
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

  const handleCacheLoad = () => {
    setAlertStatus();

    try {
      const cachedData = localStorage.getItem("SVjsonData"); // Change to sessionStorage if needed
      if (cachedData) {
        const parsedJson = JSON.parse(cachedData);
        setJsonData(parsedJson);
        setTitleLesson(parsedJson?.titleLesson || "");
        if (titleLesson !== "") setDictionaryText(titleLesson);

        setSubTitleLesson(parsedJson?.subTitleLesson || "");
        setDataRows(parsedJson?.dataRows || []);

        setAlertStatus("JSON data loaded from cache!", true, true);
      } else {
        setAlertStatus("No cached data found!", false, true);
      }
    } catch (error) {
      setAlertStatus("Error loading cached data!", false, true);
    }
  };

  const handleSaveToCache = () => {
    try {
      if (!jsonData) {
        setAlertStatus("No data to save!", false, true);
        return;
      }

      localStorage.setItem("SVjsonData", JSON.stringify(jsonData)); // Use sessionStorage if needed
      setAlertStatus("JSON data saved to cache!", true, true);
    } catch (error) {
      setAlertStatus("Error saving data to cache!", false, true);
    }
  };

  const handleClearCache = () => {
    "https://drive.google.com/file/d/1YbeJANWwJZ8-IUSHiAvoOHLdNmTXJWME/view?usp=drive_link";
  };

  const loadJsonFromGoogleDrive = async () => {
    let fileId: string = "1YbeJANWwJZ8-IUSHiAvoOHLdNmTXJWME";

    fileId = prompt("Enter File ID from Google:", fileId) || fileId;
    loadFileWithId(fileId);
  };

  const loadFileWithId = async (fileId: string) => {
    setAlertStatus();

    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB1bsgI2dwHdmhlBsrZCwN5rwl3twuwoxE`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load file");
      }
      const parsedJson = await response.json();

      setJsonData(parsedJson);
      setTitleLesson(parsedJson?.titleLesson || "");
      if (titleLesson !== "") setDictionaryText(titleLesson);

      setSubTitleLesson(parsedJson?.subTitleLesson || "");
      setDataRows(parsedJson?.dataRows || []);

      setAlertStatus("JSON file loaded from Google Drive!", true, true);
      setSelectedScreen("Preview");
    } catch (error) {
      setAlertStatus("Error loading JSON file!", false, true);
    }
  };

  const [jsonData, setJsonData] = useState(null);

  const [alertVisible, setAlertVisibility] = useState(false);
  const [alertText, setAlertText] = useState("Alert");
  const [alertColor, setAlertColor] = useState("primary");
  const [selectedScreen, setSelectedScreen] = useState("Design");
  const [dictionaryText, setDictionaryText] = useState("svAgatam");
  const [dictionarySentence, setDictionarySentence] = useState("");
  const [dictionaryShow, setDictionaryShow] = useState(false);
  const [talamShow, setTalamShow] = useState(false);
  const [stopPlayClicked, setStopPlayClicked] = useState(false);
  const [talamImage, setTalamImage] = useState("/images/Sunaadam.jpg");
  const [talamNote, setTalamNote] = useState("");

  // const addData1 = () => {
  //   let dr = { components: [] };
  //   let newArry = dataRows;
  //   newArry.push(dr);
  //   setDataRows(newArry);
  //   console.log(dataRows);
  // };

  // const addData = (dr: DataRow) => {
  //   // Create a new array reference to update state
  //   //let dr = { components: [] };
  //   console.log("dr", dr);
  //   setDataRows((prevRows) => [...prevRows, dr]);
  //   let dr1 = { components: [] };
  //   setDataRows((prevRows) => [...prevRows, dr1]);
  // };

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
      language: "default",
      border: false,
      sepType: "curve",
    };
  }
  function getNewMusicNotesCompObject(): ComponentMusicNotes {
    return {
      width: "12",
      cType: "51",
      language: "default",
      border: false,
      musicNotes: "SRGMPDNS+S+NDPMGRS",
      title: "Notes",
    };
  }

  function getNewImageCompObject(): ComponentImage {
    return {
      width: "3",
      language: "default",
      border: false,
      cType: "1",
      image: logotelugu,
      title: "bAlamukuMdamu",
    };
  }
  function getNewParaCompObject(cType: string): ComponentPara {
    return {
      image: logotelugu,
      width: "12",
      language: "default",
      border: false,
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
  function getNewMultiQuestCompObject(): ComponentMultiQuest {
    return {
      width: "12",
      language: "default",
      border: false,
      cType: "11",
      lines: ["bhaaratadESamu raajadhaani EmiTi?"],
      choices: ["DhillI", "haidaraabaadu", "muMbaayi", "ayOdhya"],
    };
  }
  function getNewPoemCompObject(): ComponentPoem {
    return {
      width: "12",
      language: "default",
      border: false,
      cType: "6",
      tag: "SlO",
      OddLineSuffix: "|",
      EvenLineSuffix: "॥",
      EvenLineExtraTab: 0,
      lines: [
        "SuklAMbaradharaM vishNuM SaSivarNaM chaturbhujaM",
        "prasannavadanaM dhyaayEt Sarva vighnOpaSAMtayE",
        "agajaananapadmaarkaM gajaananamaharniSaM",
        "anEkadaMtaM baktaanaaM EkadaMtamupaasmahE",
      ],
      title: "gaNESa praarthana",
      titlePosn: "start",
      pwidth: 2,
      swidth: 2,
      count: true,
    };
  }

  function getNewTableCompObject(): ComponentTable {
    return {
      langs: "de,de,de,de",
      border: false,
      width: "12",
      cType: "5",
      language: "default",
      title: "akaaraaMta@h puMliMga@h raama Sabda@h",
      tHeader: ",Eka, dvi, bahu",
      rows: [
        "1,raama@h, raamau, raamaa@h",
        "1.1, hE raama, hE raamau, hE raamaa@h",
        "2, raamam, raamau, raamaan",
      ],
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
      case "Music Notes comp":
        return getNewMusicNotesCompObject();
      case "Poem comp":
        return getNewPoemCompObject();
      case "Table comp":
        return getNewTableCompObject();
      case "Multiple Choice Question":
        return getNewMultiQuestCompObject();
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

  function insertRowBelow(rowIndex: number) {
    setDataRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.splice(rowIndex + 1, 0, {
        preferences: { title: "", language: "Default", endline: "solid" },
        components: [],
      });
      return newRows;
    });
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

  function updateDisctionary(str: string, sentence: string) {
    setDictionaryText(str);
    setDictionarySentence(sentence);
    setDictionaryShow(true);
    setTalamShow(false);
  }

  function updateTalam(image: string, note: string) {
    setDictionaryShow(false);
    setTalamShow(note !== "Stop");
    setTalamImage(image);
    setTalamNote(note);
    setStopPlayClicked(false);
  }

  function stopPlaying() {
    setStopPlayClicked(true);
  }

  return (
    <div className="container-fluid" style={{ minWidth: "210mm" }}>
      <Navbar lang={curLang}></Navbar>

      <NavMenu
        onSelectLanguage={handleLanguageSelectItem}
        handleFileChange={handleFileChange}
        handleDownload={handleDownload}
        handleCacheLoad={handleCacheLoad}
        handleSaveToCache={handleSaveToCache}
        loadJsonFromGoogleDrive={loadJsonFromGoogleDrive}
        onSelectScreen={onSelectScreen}
        selectedScreen={selectedScreen}
      ></NavMenu>
      {selectedScreen == "Design" && (
        <>
          {alertVisible && <Alert text={alertText} color={alertColor}></Alert>}

          <div className={"card bg-light mb-4 me-1"}>
            <div className="card-header text-center">Design</div>
            <div className="row">
              <div className="col-9">
                <div className="card-body">
                  <div className="row" style={{ marginBottom: "5px" }}>
                    <div className="col-1 no-print">
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
                    talamShow={talamShow}
                    stopPlayClicked={stopPlayClicked}
                    preferencesUpdate={preferencesUpdate}
                    updateDisctionary={updateDisctionary}
                    insertRowBelow={insertRowBelow}
                    updateTalam={updateTalam}
                  ></RowsDesign>
                  <div className="row" style={{ marginBottom: "5px" }}>
                    <div className="col-1">
                      <Button color="primary" symbol="➕" onClick={addRow}>
                        Add Row
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-2">
                {dictionaryShow && (
                  <DictionaryComponent
                    text={dictionaryText}
                    sentence={dictionarySentence}
                    curLang={curLang}
                  ></DictionaryComponent>
                )}
                {talamShow && (
                  <TalamComponent
                    image={talamImage}
                    note={talamNote}
                    stopPlaying={stopPlaying}
                  ></TalamComponent>
                )}
              </div>
            </div>
          </div>

          {/* 
      <div className="row" style={{ marginBottom: "5px" }}>
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
          <div className={"col-12 div-" + curLang + "gen fontup"}>
            <p className="text-center fontup2">
              {getTestInLocalLanguage(titleLesson)}
            </p>
            {subTitleLesson !== "" && (
              <p className="text-center">
                {getTestInLocalLanguage(subTitleLesson)}
              </p>
            )}
          </div>

          {dataRows.map((item: any, index: number) => (
            <div className="row" style={{ marginBottom: "5px" }}>
              <div className="col-11">
                <RowPreview
                  dataRow={item}
                  curLang={curLang}
                  talamShow={talamShow}
                  stopPlayClicked={stopPlayClicked}
                  updateDisctionary={updateDisctionary}
                  updateTalam={updateTalam}
                ></RowPreview>
              </div>
            </div>
          ))}

          <div className="col-2">
            {dictionaryShow && (
              <DictionaryComponent
                text={dictionaryText}
                sentence={dictionarySentence}
                curLang={curLang}
              ></DictionaryComponent>
            )}
            {talamShow && (
              <TalamComponent
                image={talamImage}
                note={talamNote}
                stopPlaying={stopPlaying}
              ></TalamComponent>
            )}
          </div>
        </>
      )}
      {selectedScreen == "Library" && (
        <>
          <TaragatiSelector loadFileWithId={loadFileWithId}></TaragatiSelector>
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

      {/* <div>
        <h1>React + Vite + Tone.js</h1>
        <ToneComponent
          notes={[
            { note: 60, duration: 1 },
            { note: 61, duration: 1 },
            { note: 65, duration: 2 },
            { note: 64, duration: 1 },
            { note: 61, duration: 1 },
            { note: 60, duration: 1 },
            { note: 61, duration: 1 },
            { note: 64, duration: 1 },
            { note: 61, duration: 1 },
            { note: 60, duration: 2 },
          ]}
        />
      </div> */}
    </div>
  );
}

export default App;
