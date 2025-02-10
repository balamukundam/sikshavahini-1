import React from "react";
import { ComponentType, ComponentPara } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  paraComponentData: ComponentPara;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditParaComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  paraComponentData,
  onDataUpdate,
}) => {
  const handleTitleChange = (value: string) => {
    paraComponentData.title = value;
    onDataUpdate(rowIndex, compIndex, paraComponentData);
  };
  const handleParaChange = (value: string) => {
    paraComponentData.lines = value.split("\n");
    onDataUpdate(rowIndex, compIndex, paraComponentData);
  };
  const handleImageChange = (value: string) => {
    paraComponentData.image = value;
    onDataUpdate(rowIndex, compIndex, paraComponentData);
  };
  const handleWidthChange = (value: string) => {
    paraComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, paraComponentData);
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
              value={paraComponentData.title}
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
              value={paraComponentData.width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text" id="image-input">
          Image
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Image"
          aria-label="Image"
          aria-describedby="image-input"
          id="imageInputField"
          value={paraComponentData.image}
          onChange={(e) => handleImageChange(e.target.value)}
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
        {paraComponentData.lines.join("\n")}
      </textarea>
    </>
  );
};

export default EditParaComponent;
