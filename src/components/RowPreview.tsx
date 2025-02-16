import React from "react";
import { useState } from "react";
import { DataRow } from "../services/dataTypes";
import { EngToTelService } from "../services/engToTelugu";
import PreviewParaComponent from "./PreviewParaComponent";
import PreviewImageComponent from "./PreviewImageComponent";
import PreviewTableComponent from "./PreviewTableComponent";
import PreviewPoemComponent from "./PreviewPoemComponent";
import PreviewSeparatorComponent from "./PreviewSeparatorComponent";

interface Props {
  dataRow: any; // Initial data passed to the component
  curLang: string;
}

const RowPreview: React.FC<Props> = ({ dataRow, curLang }) => {
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
      <div className="row" style={{ marginBottom: "25px" }}>
        {dataRow["components"].map((item: any, index: number) => (
          <div className={"col-" + item["width"]}>
            {item["cType"] === "1" && (
              <>
                <PreviewImageComponent
                  imageComp={item}
                  curLang={curLang}
                ></PreviewImageComponent>
              </>
            )}
            {item["cType"] === "2" && (
              <PreviewParaComponent
                paraComp={item}
                curLang={curLang}
                orderType={0}
              ></PreviewParaComponent>
            )}
            {item["cType"] === "3" && (
              <>
                <PreviewParaComponent
                  paraComp={item}
                  curLang={curLang}
                  orderType={1}
                ></PreviewParaComponent>
              </>
            )}
            {item["cType"] === "4" && (
              <>
                <PreviewParaComponent
                  paraComp={item}
                  curLang={curLang}
                  orderType={2}
                ></PreviewParaComponent>
              </>
            )}
            {item["cType"] === "5" && (
              <>
                <PreviewTableComponent
                  tableComp={item}
                  curLang={curLang}
                ></PreviewTableComponent>
              </>
            )}

            {item["cType"] === "6" && (
              <>
                <PreviewPoemComponent
                  poemComp={item}
                  curLang={curLang}
                ></PreviewPoemComponent>
              </>
            )}

            {item["cType"] === "7" && (
              <>
                <p>For future</p>
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
