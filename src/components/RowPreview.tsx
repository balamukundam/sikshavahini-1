import React from "react";
import { useState } from "react";
import { DataRow } from "../services/dataTypes";
import { EngToTelService } from "../services/engToTelugu";
import PreviewParaComponent from "./PreviewParaComponent";
import PreviewImageComponent from "./PreviewImageComponent";
import PreviewTableComponent from "./PreviewTableComponent";
import PreviewPoemComponent from "./PreviewPoemComponent";
import PreviewSeparatorComponent from "./PreviewSeparatorComponent";
import PreviewMultipleQuestionComp from "./PreviewMultipleQuestionComp";
import PreviewMusicNotesComponent from "./PreviewMusicNotesComponent";

interface Props {
  dataRow: any; // Initial data passed to the component
  curLang: string;
  talamShow: boolean;
  stopPlayClicked: boolean;
  updateDisctionary: (str: string, sentence: string) => void;
  updateTalam: (image: string, note: string) => void;
}

const RowPreview: React.FC<Props> = ({
  dataRow,
  curLang,
  talamShow,
  stopPlayClicked,
  updateDisctionary,
  updateTalam,
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
                  stopPlayClicked={stopPlayClicked}
                  talamShow={talamShow}
                  updateTalam={updateTalam}
                ></PreviewMusicNotesComponent>
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
