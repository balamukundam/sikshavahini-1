import React from "react";
import { EngToTelService } from "../services/engToTelugu";
import PToolTip from "./PToolTip";

interface Props {
  poemComp: any;
  curLang: string;
}

const PreviewPoemComponent = ({ poemComp, curLang }: Props) => {
  let ett: EngToTelService = new EngToTelService();
  const cellStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  let bLine = false;
  const getLineSuffix = () => {
    bLine = !bLine;
    return bLine ? poemComp["OddLineSuffix"] : poemComp["EvenLineSuffix"];
  };

  let bLineSpace = false;
  const getLineSpace = () => {
    bLineSpace = !bLineSpace;
    return bLineSpace ? "0px" : poemComp["EvenLineExtraTab"] + "%";
  };

  return (
    <>
      {!!poemComp["title"] && (
        <div className="row">
          <div className={"col-" + poemComp["pwidth"]}></div>
          <div className={"col-" + (12 - poemComp["swidth"])}>
            <p className={"text-" + poemComp["titlePosn"]}>
              <PToolTip
                textToShow={poemComp["title"]}
                curLang={curLang}
              ></PToolTip>
            </p>
          </div>
        </div>
      )}

      <div className="row" style={{ marginBottom: "25px" }}>
        <div className={"col-" + poemComp["pwidth"]}>
          <p>
            <PToolTip textToShow={poemComp["tag"]} curLang={curLang}></PToolTip>
          </p>
        </div>

        <div className={"col-" + (12 - poemComp["pwidth"])}>
          <div className="row" style={{ marginBottom: "25px" }}>
            {poemComp["lines"].map((line: any) => (
              <>
                <div className={"col-" + (12 - poemComp["swidth"])}>
                  <>
                    <p style={{ marginLeft: getLineSpace() }}>
                      <PToolTip textToShow={line} curLang={curLang}></PToolTip>
                    </p>
                  </>
                </div>

                <div className={"col-" + poemComp["swidth"]}>
                  <p>
                    <PToolTip
                      textToShow={getLineSuffix()}
                      curLang={curLang}
                    ></PToolTip>
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPoemComponent;
