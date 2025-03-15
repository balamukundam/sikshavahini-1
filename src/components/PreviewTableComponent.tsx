import React from "react";
import { EngToTelService } from "../services/engToTelugu";
import PToolTip from "./PToolTip";

interface Props {
  tableComp: any;
  curLang: string;
  updateDisctionary: (str: string, sentence: string) => void;
}

const PreviewTableComponent = ({
  tableComp,
  curLang,
  updateDisctionary,
}: Props) => {
  let ett: EngToTelService = new EngToTelService();
  const cellStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  const createDictionary = (str: string) => {
    updateDisctionary(str, "");
  };

  const getLang = (index: number): string => {
    let langs: string[] = tableComp["langs"].split(",");
    if (index < langs.length) {
      switch (langs[index]) {
        case "sa":
          return "devanagari";
        case "te":
          return "telugu";
        case "tr":
          return "transcription";
        default:
          return curLang;
      }
    }
    return curLang;
  };

  return (
    <>
      {!!tableComp["title"] && (
        <p className="text-center">
          <PToolTip
            textToShow={tableComp["title"]}
            curLang={curLang}
            handleClick={createDictionary}
          ></PToolTip>
        </p>
      )}

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {!!tableComp["tHeader"] && (
          <thead>
            <tr>
              {tableComp["tHeader"]
                .split(",")
                .map((line: any, index: number) => (
                  <th style={cellStyle}>
                    <PToolTip
                      textToShow={line}
                      curLang={getLang(index)}
                      handleClick={createDictionary}
                    ></PToolTip>
                  </th>
                ))}
            </tr>
          </thead>
        )}

        <tbody>
          {tableComp["rows"].map((line: any) => (
            <tr>
              {line.split(",").map((cell: any, index: number) => (
                <td style={cellStyle}>
                  <PToolTip
                    textToShow={cell}
                    curLang={getLang(index)}
                    handleClick={createDictionary}
                  ></PToolTip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PreviewTableComponent;
