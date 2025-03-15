import React from "react";
import { ComponentType, ComponentTable } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  tableComponentData: ComponentTable;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditTableComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  tableComponentData,
  onDataUpdate,
}) => {
  const handleTitleChange = (value: string) => {
    tableComponentData.title = value;
    onDataUpdate(rowIndex, compIndex, tableComponentData);
  };
  const handleParaChange = (value: string) => {
    tableComponentData.rows = value.split("\n");
    onDataUpdate(rowIndex, compIndex, tableComponentData);
  };

  const handleTHeaderChange = (value: string) => {
    tableComponentData.tHeader = value;
    onDataUpdate(rowIndex, compIndex, tableComponentData);
  };

  const handleWidthChange = (value: string) => {
    tableComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, tableComponentData);
  };

  const handleTLanguageChange = (value: string) => {
    tableComponentData.langs = value;
    onDataUpdate(rowIndex, compIndex, tableComponentData);
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="input-group mb-4">
            <span className="input-group-text" id="title-input">
              Title
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="title-input"
              id="titleInputField"
              value={tableComponentData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-3">
          <div className="input-group mb-4">
            <span className="input-group-text" id="width-input">
              Width
            </span>

            <input
              type="number"
              className="form-control"
              min="1"
              max="12"
              id="widthInputField"
              aria-describedby="width-input"
              value={tableComponentData.width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text" id="title-input">
          Table Header
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          aria-label="Title"
          aria-describedby="title-input"
          id="titleInputField"
          value={tableComponentData.tHeader}
          onChange={(e) => handleTHeaderChange(e.target.value)}
        />

        <span className="input-group-text" id="language-input">
          Languages
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Language"
          aria-label="Language"
          aria-describedby="language-input"
          id="languageInputField"
          value={tableComponentData.langs}
          onChange={(e) => handleTLanguageChange(e.target.value)}
        />
      </div>

      <textarea
        rows={8}
        cols={0}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Add text"
        style={{ width: "100%" }}
        onChange={(e) => handleParaChange(e.target.value)}
      >
        {tableComponentData.rows.join("\n")}
      </textarea>
    </>
  );
};

export default EditTableComponent;
