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
  ComponentMusicLKalpanaNotes,
  noteOptions,
  melakartaDataList,
  musicSets,
  ComponentMusicGeethams,
  ComponentMusicGeethamsMulti,
} from "./services/dataTypes";
import { downloadData } from "./services/downloadUtils";
import React from "react";
import { EngToTelService } from "./services/engToTelugu";
import TitleInput from "./components/TitleInput";
import RowsDesign from "./components/RowsDesign";
import RowPreview from "./components/RowPreview";
import Button from "./components/Button";
import logotelugu from "/images/Bpic-2.png";
import HelpPage from "./components/HelpPage";
import DictionaryComponent from "./components/DictionaryComponent";
import TaragatiSelector from "./components/TaragatiSelector";
import TalamComponent from "./components/TalamComponent";
import MusicSettings from "./components/MusicSettings";
import PitchBendSynth from "./components/PitchBendSynth";
import { RagamFactory, RagamName } from "./services/RagamFactory";

function App() {
  let items1 = ["Level-1", "Level-2", "Level-3"];
  let items2 = ["Rama-1", "Jaya-2", "Lalitha-3"];

  let ett: EngToTelService = new EngToTelService();

  const [curLang, setLanguage] = useState<BmkLanguage>(BmkLanguages.telugu);

  const [musicSettings, setMusicSettings] = useState<musicSets>({
    bpm: 45,
    pitch: 60,
    instrument: "Basic",
    melakarta: 15,
  });

  const [titleLesson, setTitleLesson] = useState("");
  const [subTitleLesson, setSubTitleLesson] = useState("");
  const [dataRows, setDataRows] = useState<DataRow[]>([]);
  const [ragam, setRagam] = useState<RagamName>("");

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
          setRagam("");

          onMusicSettingsChange(parsedJson?.musicSettings);

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
  const updateRagam = (item: RagamName) => {
    if (ragam !== item) {
      let msdata: musicSets = musicSettings;
      msdata.melakarta = RagamFactory.getRagamDetails(item).melakarta;
      msdata.bpm = 45;
      msdata.instrument = "Basic";
      setRagam(item);
      onMusicSettingsChange(msdata);
    }
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
        setRagam("");
        if (parsedJson?.musicSettings)
          onMusicSettingsChange(parsedJson.musicSettings);

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
      setRagam("");
      if (parsedJson?.musicSettings)
        onMusicSettingsChange(parsedJson.musicSettings);

      setAlertStatus("JSON file loaded from Google Drive!", true, true);
      setSelectedScreen("Design");
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
      speeds: "1,2",
      talamSeq: "0,1,2,3,0,6,0,6",
    };
  }

  function getNewMusicGeethamCompObject(): ComponentMusicGeethams {
    return {
      width: "12",
      cType: "52",
      language: "default",
      border: false,
      musicNotes:
        "MPDS+S+R+ R+S+DPMP RMPDMP DPMGRS S;RMGR SRGRS; RMPDMP DPMGRS S;RMGR SRGRS;",
      musicLyrics: [
        "Sri ; Ga Na na tha Sin dhu ; ra va rna ka ru Na Sa ga ra ka ri va da naa ; lam ; bo ; da ra la ku mi ka ra ; am ; ba ; su ta a ma ra vi nu ta lam ; bo ; da ra la ku mi ka ra ;",
        "Si ddha cha ; ra na ga na se ; vi ta si ddhi vi naa ya ka te ; na mo na mo lam ; bo ; da ra la ku mi ka ra ; am ; ba ; su ta a ma ra vi nu ta lam ; bo ; da ra la ku mi ka ra ;",
        "sa ka la vi dya ; aa di pu ; ji ta sa ; rvo ; tta ma te ; na mo na mo lam ; bo ; da ra la ku mi ka ra ; am ; ba ; su ta a ma ra vi nu ta lam ; bo ; da ra la ku mi ka ra ;",
      ],
      title: "Geetham-01",
      speeds: "1,2,4",
      talamSeq: "0,6,0,1,2,3",
      ragam: "Malahari",
    };
  }

  function getNewMusicGeethamMultiCompObject(): ComponentMusicGeethamsMulti {
    return {
      width: "12",
      cType: "53",
      language: "default",
      border: false,
      musicPallavi: "S;;RG;P;D;S+;N;D; P;DPMGRSRSN-D-S;;;",
      lyricsPallavi:
        "raa ; ; ra vE ; Nu ; gO ; pa ; baa ; laa ; raa ; ji ta sad ; gu Na ja ya shee ; laa ; ; ;",
      pallaviGati: 2,
      musicNotes: [
        "S;;RG;P;M;;GP;D; R+;;S+N;D;P;;MG;R;",
        "S;;RG;G;G;;;;;RG P;;PP;P;P;;;;;DP S+;;S+S+;S+;G+R+S+NNDP; PDPMGRR;GPMGRSRG",
        "PPP;RRR;GPMGG;;; GPMGMGRSRGRSS;;; RSN-D-S;;;MGRGP;;; DPDR+S+;;;R+S+NDPMGR",
        "P;;;MGRGD;;;MGRG P;;;MGRGP;P;P;;; G+;;;R+S+NDR+;;;R+S+ND S+;;;R+S+NDS+;S+;S+;;; G+;R+S+R+;R+;R+;;;R+;S+N D;D;D;;;P;MGG;G; G;;;SRGDP;;;R+S+R+G+ S+;;;G+R+S+NDPMGRSRG",
      ],
      musicLyrics: [
        "saa ; ; ra saa ; kshha ; nE ; ; ra mE ; mi ; ma ; ; ru baa ; dha ; kO ; ; rva lE ; ; raa",
        "nan ; ; da gO ; paa ; laa ; ; ; ; ; nE ; nen ; ; du pO ; jaa ; laa ; ; ; ; ; nee ; vin ; ; du raa ; raa ; sa da ma la ma di tO ; mu da ma la ra ga naa ; ke du ru ga ga di ya raa",
        "pa lu maa ; ru nu gaa ; ra va mu na nin ; ; ; pi la chi na pa lu ka vu na lu ga ku raa ; ; ; ka ri va ra daa ; ; ; ma ri ma ri naa ; ; ; ya dha ra mu grO ; ; ; la raa ka ni ka ra mu ga",
        "raa ; ; ; na ga dha ra raa ; ; ; mu ra ha ra raa ; ; ; bha va ha ra raa ; vE ; raa ; ; ; ee ; ; ; ma gu va nu ee ; ; ; la la na nu ee ; ; ; so ga si ni chE ; kO ; raa ; ; ; kO ; ri ka lim ; pon ; da ; ; ; Den ; da mu nee ; yan ; du ; ; ; jE ; re nu nee ; chen ; ta ; ; ; ma ru va ku raa ; ; ; ka ra mu la chE ; ; ; ma ri ma ri ni nu sha ra Na ne da ra",
      ],
      title: "Geetham-14",
      gatis: [2],
      talamSeq: "0,1,2,3,0,6,0,6",
      ragam: "Bilahari",
    };
  }

  function getNewMusicKalpanaSwaraCompObject(): ComponentMusicLKalpanaNotes {
    return {
      width: "12",
      cType: "55",
      language: "default",
      border: false,
      musicNotes:
        "P;D;N; \n G;M;P;D;N; \n S+; N; D; P; M; G; M; P; D; N; \n R+ ; S+ ; S+; N; N; D; P; M; G; M; P; D; N; ",
      musicPallavi: "S ; D- S ;R ; R ; R ",
      lyricsPallavi: "Si va ; Si va *; Si ; va ; ya ; na ; ra ; ; ; da ; ; ;",
      pStart: "2",
      title: "Notes",
      npb: "4",
      talamSeq: "0,1,2,3,0,6,0,6",
    };
  }

  // function getNewMusicKalpanaSwaraCompObject(): ComponentMusicLKalpanaNotes {
  //   return {
  //     width: "12",
  //     cType: "55",
  //     language: "default",
  //     border: false,
  //     musicNotes:
  //       "P;D;N; \n G;M;P;D;N; \n S+; N; D; P; M; G; M; P; D; N; \n R+ ; S+ ; S+; N; N; D; P; M; G; M; P; D; N; ",
  //     musicPallavi: "NS+; ND; P;PM G; M; P ; ; D P M G ;",
  //     lyricsPallavi: "Si va ; Si va *; Si ; va ; ya ; na ; ra ; ; ; da ; ; ;",
  //     pStart: "2",
  //     title: "Notes",
  //     npb: "4",
  //     talamSeq: "0,1,2,3,0,6,0,6",
  //   };
  // }

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
      case "Music Geethams comp":
        return getNewMusicGeethamCompObject();
      case "Music Multi Geethams comp":
        return getNewMusicGeethamMultiCompObject();
      case "Music Kalpana Swara comp":
        return getNewMusicKalpanaSwaraCompObject();
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

  function isMusicSettingsRequired(): boolean {
    return dataRows.some((row) =>
      row.components.some(
        (component) =>
          component.cType === "51" ||
          component.cType === "52" ||
          component.cType === "53" ||
          component.cType === "55"
      )
    );
  }

  function onMusicSettingsChange(msdata: musicSets): void {
    if (msdata) {
      const updatedSettings = {
        ...musicSettings, // copy old settings
        ...(msdata.bpm && { bpm: msdata.bpm }),
        ...(msdata.pitch && { pitch: msdata.pitch }),
        ...(msdata.instrument && { instrument: msdata.instrument }),
        ...(msdata.melakarta && { melakarta: msdata.melakarta }), // fixed: previously you used bpm by mistake
      };
      setMusicSettings(updatedSettings);
    }
  }

  const getNameByValue = (value: number): string | undefined => {
    for (const chakra of melakartaDataList) {
      const foundItem = chakra.items.find((item) => item.value === value);
      if (foundItem) return foundItem.name;
    }
    return undefined; // Return undefined if not found
  };

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
                  {isMusicSettingsRequired() && (
                    <div className="row" style={{ marginBottom: "5px" }}>
                      <div className="col-1 no-print">
                        <MusicSettings
                          musicSettings={musicSettings}
                          onMusicSettingsChange={onMusicSettingsChange}
                        ></MusicSettings>
                      </div>
                      <div className={"col-11 div-" + curLang + "gen fontup"}>
                        <div className="row justify-content-center">
                          <div className="col-lg-8 col-md-10 col-sm-12">
                            <div className="card shadow-sm border-0 rounded-3">
                              <div className="card-body text-center">
                                <p className="m-0 fw-bold text-primary">
                                  <span className="text-dark">Shruthi:</span>{" "}
                                  {
                                    noteOptions.find(
                                      (n) => n.value === musicSettings.pitch
                                    )?.label
                                  }
                                </p>
                                <p className="m-0 fw-bold text-success">
                                  <span className="text-dark">Laya:</span>{" "}
                                  {musicSettings.bpm} BPM
                                </p>
                                <p className="m-0 fw-bold text-secondary">
                                  <span className="text-dark">Instrument:</span>{" "}
                                  {musicSettings.instrument}
                                </p>
                                {ragam !== "" && (
                                  <p className="m-0 fw-bold text-secondary">
                                    <span className="text-dark">Ragam:</span>{" "}
                                    {ragam}
                                  </p>
                                )}
                                <p className="m-0 fw-bold text-danger">
                                  <span className="text-dark">Melakartha:</span>{" "}
                                  {musicSettings.melakarta}
                                  {getNameByValue(musicSettings.melakarta)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <RowsDesign
                    initialDataRows={dataRows}
                    musicSettings={musicSettings}
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
                    setRagam={updateRagam}
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

          {false && (
            <div>
              <p>Test12</p>
              <PitchBendSynth></PitchBendSynth>
            </div>
          )}
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
                  rowNbr={index}
                  musicSettings={musicSettings}
                  curLang={curLang}
                  talamShow={talamShow}
                  stopPlayClicked={stopPlayClicked}
                  updateDisctionary={updateDisctionary}
                  updateTalam={updateTalam}
                  setRagam={updateRagam}
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
