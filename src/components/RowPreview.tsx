import React from "react";
import { useState } from "react";
import { DataRow, musicSets } from "../services/dataTypes";
import { EngToTelService } from "../services/engToTelugu";
import PreviewParaComponent from "./PreviewParaComponent";
import PreviewImageComponent from "./PreviewImageComponent";
import PreviewTableComponent from "./PreviewTableComponent";
import PreviewPoemComponent from "./PreviewPoemComponent";
import PreviewSeparatorComponent from "./PreviewSeparatorComponent";
import PreviewMultipleQuestionComp from "./PreviewMultipleQuestionComp";
import PreviewMusicNotesComponent from "./PreviewMusicNotesComponent";
import PreviewMusicKalapanaSwaramComponent from "./PreviewMusicKalapanaSwaramComponent";
import PreviewMusicGeethamComponent from "./PreviewMusicGeethamComponent";
import { RagamName } from "../services/RagamFactory";
import PreviewMusicGeethamMultiComponent from "./PreviewMusicGeethamMultiComponent";

interface Props {
  dataRow: any; // Initial data passed to the component
  rowNbr: number;
  musicSettings: musicSets;
  curLang: string;
  talamShow: boolean;
  stopPlayClicked: boolean;
  updateDisctionary: (str: string, sentence: string) => void;
  updateTalam: (image: string, note: string) => void;
  setRagam: (ragam: RagamName) => void;
}

const RowPreview: React.FC<Props> = ({
  dataRow,
  rowNbr,
  musicSettings,
  curLang,
  talamShow,
  stopPlayClicked,
  updateDisctionary,
  updateTalam,
  setRagam,
}) => {
  // Initialize state with the dataRows
  if (dataRow["preferences"]["language"] !== "Default") {
    curLang = dataRow["preferences"]["language"];
  }

  let ett: EngToTelService = new EngToTelService();

  // Function to add data to the rows

  return (
    <div className={"div-" + curLang + "gen fontup"}>
      {dataRow["preferences"]["title"] !== "" && (
        <p className="text-center fontup">
          {ett.getStringInUserLanguage(
            curLang,
            dataRow["preferences"]["title"]
          )}
        </p>
      )}
      <div className="row" style={{ marginBottom: "5px" }}>
        {dataRow["components"].map((item: any, index: number) => (
          <div className={"col-" + item["width"]}>
            {item["cType"] === "1" && (
              <>
                <PreviewImageComponent
                  imageComp={item}
                  curLang={curLang}
                  updateDisctionary={updateDisctionary}
                ></PreviewImageComponent>
              </>
            )}
            {item["cType"] === "2" && (
              <PreviewParaComponent
                paraComp={item}
                curLang={curLang}
                orderType={0}
                updateDisctionary={updateDisctionary}
              ></PreviewParaComponent>
            )}
            {item["cType"] === "3" && (
              <>
                <PreviewParaComponent
                  paraComp={item}
                  curLang={curLang}
                  orderType={1}
                  updateDisctionary={updateDisctionary}
                ></PreviewParaComponent>
              </>
            )}
            {item["cType"] === "4" && (
              <>
                <PreviewParaComponent
                  paraComp={item}
                  curLang={curLang}
                  orderType={2}
                  updateDisctionary={updateDisctionary}
                ></PreviewParaComponent>
              </>
            )}
            {item["cType"] === "5" && (
              <>
                <PreviewTableComponent
                  tableComp={item}
                  curLang={curLang}
                  updateDisctionary={updateDisctionary}
                ></PreviewTableComponent>
              </>
            )}

            {item["cType"] === "6" && (
              <>
                <PreviewPoemComponent
                  poemComp={item}
                  curLang={curLang}
                  updateDisctionary={updateDisctionary}
                ></PreviewPoemComponent>
              </>
            )}

            {item["cType"] === "7" && (
              <>
                <p>For future</p>
              </>
            )}
            {item["cType"] === "11" && (
              <>
                <PreviewMultipleQuestionComp
                  multiQuestComp={item}
                  curLang={curLang}
                  updateDisctionary={updateDisctionary}
                ></PreviewMultipleQuestionComp>
              </>
            )}
            {item["cType"] === "51" && (
              <>
                <PreviewMusicNotesComponent
                  musicNotesComp={item}
                  musicSettings={musicSettings}
                  stopPlayClicked={stopPlayClicked}
                  talamShow={talamShow}
                  rowg={rowNbr}
                  colg={index}
                  updateTalam={updateTalam}
                ></PreviewMusicNotesComponent>
              </>
            )}
            {item["cType"] === "52" && (
              <>
                <PreviewMusicGeethamComponent
                  musicGeethamComp={item}
                  musicSettings={musicSettings}
                  stopPlayClicked={stopPlayClicked}
                  talamShow={talamShow}
                  rowg={rowNbr}
                  colg={index}
                  updateTalam={updateTalam}
                  setRagam={setRagam}
                ></PreviewMusicGeethamComponent>
              </>
            )}
            {item["cType"] === "53" && (
              <>
                <PreviewMusicGeethamMultiComponent
                  musicGeethamMultiComp={item}
                  musicSettings={musicSettings}
                  stopPlayClicked={stopPlayClicked}
                  talamShow={talamShow}
                  rowg={rowNbr}
                  colg={index}
                  updateTalam={updateTalam}
                  setRagam={setRagam}
                ></PreviewMusicGeethamMultiComponent>
              </>
            )}
            {item["cType"] === "55" && (
              <>
                <PreviewMusicKalapanaSwaramComponent
                  musicNotesComp={item}
                  musicSettings={musicSettings}
                  stopPlayClicked={stopPlayClicked}
                  talamShow={talamShow}
                  rowg={rowNbr}
                  colg={index}
                  updateTalam={updateTalam}
                ></PreviewMusicKalapanaSwaramComponent>
              </>
            )}

            {item["cType"] === "99" && (
              <>
                <PreviewSeparatorComponent
                  sepComp={item}
                ></PreviewSeparatorComponent>
              </>
            )}
          </div>
        ))}

        {dataRow["preferences"]["endline"] == "solid" && <hr></hr>}
      </div>
    </div>
  );
};

export default RowPreview;
