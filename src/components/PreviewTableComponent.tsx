import React from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  tableComp: any;
  curLang: string;
}

const PreviewTableComponent = ({ tableComp, curLang }: Props) => {
  let ett: EngToTelService = new EngToTelService();
  const cellStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <>
      {!!tableComp["title"] && (
        <p className="text-center">
          {ett.getStringInUserLanguage(curLang, tableComp["title"])}
        </p>
      )}

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {!!tableComp["header"] && (
          <thead>
            <tr>
              {tableComp["header"].split(",").map((line: any) => (
                <th style={cellStyle}>
                  {ett.getStringInUserLanguage(curLang, line)}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {tableComp["rows"].map((line: any) => (
            <tr>
              {line.split(",").map((cell: any) => (
                <td style={cellStyle}>
                  {ett.getStringInUserLanguage(curLang, cell)}
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
