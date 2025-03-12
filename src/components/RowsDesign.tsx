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
  deleteRow: (rowIndex: number) => void;
  addComponent: (rowIndex: number, newComponentType: string) => void;
  insertComponent: (
    rowIndex: number,
    compIndex: number,
    newComponentType: string
  ) => void;
  moveComponent: (rowIndex: number, compIndex: number) => void;
  deleteComponent: (rowIndex: number, compIndex: number) => void;
  moveRow: (rowIndex: number) => void;
  preferencesUpdate: (rowIndex: number, updatedPreferences: any) => void;
  updateDisctionary: (str: string, sentence: string) => void;
}

const RowsDesign: React.FC<Props> = ({
  initialDataRows,
  curLang,
  onDataUpdate,
  deleteRow,
  addComponent,
  insertComponent,
  moveComponent,
  deleteComponent,
  moveRow,
  preferencesUpdate,
  updateDisctionary,
}) => {
  // Initialize state with the dataRows
  // const [dataRows, setDataRows] = useState<any[]>(initialDataRows);
  // console.log("from rows design:", dataRows);

  return (
    <>
      {initialDataRows.map((item: any, index: number) => (
        <div className="row" style={{ marginBottom: "5px" }}>
          <div className="col-1">
            <RowInput
              rowData={item}
              rowIndex={index}
              rowsCount={initialDataRows.length}
              onDataUpdate={onDataUpdate}
              deleteRow={deleteRow}
              addComponent={addComponent}
              insertComponent={insertComponent}
              moveComponent={moveComponent}
              deleteComponent={deleteComponent}
              moveRow={moveRow}
              preferencesUpdate={preferencesUpdate}
            ></RowInput>
          </div>

          <div className="col-11">
            <RowPreview
              dataRow={item}
              curLang={curLang}
              updateDisctionary={updateDisctionary}
            ></RowPreview>
          </div>
        </div>
      ))}
    </>
  );
};

export default RowsDesign;
