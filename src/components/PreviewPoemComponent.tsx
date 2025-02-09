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

  return (
    <>
      {!!poemComp["title"] && (
        <p className="text-center">
          {ett.getStringInUserLanguage(curLang, poemComp["title"])}
        </p>
      )}

      {poemComp["poems"].map((poem: any, index: number) => (
        <div className="row" style={{ marginBottom: "25px" }}>
          <div className="col-2">
            <p>{ett.getStringInUserLanguage(curLang, poem["tag"])}</p>
          </div>

          <div className="col-10">
            <div className="row" style={{ marginBottom: "25px" }}>
              {poem["lines"].map((line: any) => (
                <>
                  <div className="col-8">
                    <p>{ett.getStringInUserLanguage(curLang, line["line"])}</p>
                  </div>

                  <div className="col-4">
                    <p>{ett.getStringInUserLanguage(curLang, line["suf"])}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PreviewPoemComponent;
