import React from "react";
import Button from "./Button";
import { useState } from "react";
import RowPreview from "./RowPreview";
import RowInput from "./RowInput";
import {
  BmkLanguage,
  BmkLanguages,
  DataRow,
  ComponentType,
} from "../services/dataTypes";

interface Props {
  initialDataRows: any[]; // Initial data passed to the component
  curLang: string;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const RowsDesign: React.FC<Props> = ({
  initialDataRows,
  curLang,
  onDataUpdate,
}) => {
  // Initialize state with the dataRows
  // const [dataRows, setDataRows] = useState<any[]>(initialDataRows);
  // console.log("from rows design:", dataRows);

  return (
    <>
      {initialDataRows.map((item: any, index: number) => (
        <div className="row" style={{ marginBottom: "25px" }}>
          <div className="col-1">
            <RowInput
              rowData={item}
              rowIndex={index}
              onDataUpdate={onDataUpdate}
            ></RowInput>
          </div>

          <div className="col-11">
            <RowPreview dataRow={item} curLang={curLang}></RowPreview>
          </div>
        </div>
      ))}
    </>
  );
};

export default RowsDesign;
