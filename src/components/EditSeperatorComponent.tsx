import React from "react";
import { ComponentType, ComponentSeparator } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  sepComponentData: ComponentSeparator;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditSeperatorComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  sepComponentData,
  onDataUpdate,
}) => {
  const handleWidthChange = (value: string) => {
    sepComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, sepComponentData);
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="input-group mb-4">
            <span className="input-group-text" id="title-input">
              Type
            </span>
            <input />
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
              value={sepComponentData.width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSeperatorComponent;
