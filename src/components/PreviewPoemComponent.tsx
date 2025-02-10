import React from "react";
import { EngToTelService } from "../services/engToTelugu";

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

  return (
    <>
      {!!poemComp["title"] && (
        <p className="text-center">
          {ett.getStringInUserLanguage(curLang, poemComp["title"])}
        </p>
      )}

      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-2">
          <p>{ett.getStringInUserLanguage(curLang, poemComp["tag"])}</p>
        </div>

        <div className="col-10">
          <div className="row" style={{ marginBottom: "25px" }}>
            {poemComp["lines"].map((line: any) => (
              <>
                <div className="col-8">
                  <p>{ett.getStringInUserLanguage(curLang, line)}</p>
                </div>

                <div className="col-4">
                  <p>{ett.getStringInUserLanguage(curLang, getLineSuffix())}</p>
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
