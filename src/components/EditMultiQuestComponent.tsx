import React from "react";
import { ComponentType, ComponentMultiQuest } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  multiQuestComponentData: ComponentMultiQuest;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditMultiQuestComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  multiQuestComponentData,
  onDataUpdate,
}) => {
  const handleParaChange = (value: string) => {
    multiQuestComponentData.lines = value.split("\n");
    onDataUpdate(rowIndex, compIndex, multiQuestComponentData);
  };

  const handleChoiceChange = (value: string) => {
    multiQuestComponentData.choices = value.split("\n");
    onDataUpdate(rowIndex, compIndex, multiQuestComponentData);
  };

  const handleWidthChange = (value: string) => {
    multiQuestComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, multiQuestComponentData);
  };

  return (
    <>
      <div className="row">
        <div className="col-9"></div>
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
              value={multiQuestComponentData.width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />
          </div>
        </div>
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
        {multiQuestComponentData.lines.join("\n")}
      </textarea>

      <textarea
        rows={8}
        cols={0}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Add text2"
        style={{ width: "100%" }}
        onChange={(e) => handleChoiceChange(e.target.value)}
      >
        {multiQuestComponentData.choices.join("\n")}
      </textarea>
    </>
  );
};

export default EditMultiQuestComponent;
