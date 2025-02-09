import React from "react";
import { ComponentType, ComponentImage } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  imageComponentData: ComponentImage;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditImageComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  imageComponentData,
  onDataUpdate,
}) => {
  const handleTitleChange = (value: string) => {
    imageComponentData.title = value;
    onDataUpdate(rowIndex, compIndex, imageComponentData);
  };
  const handleImageChange = (value: string) => {
    imageComponentData.image = value;
    onDataUpdate(rowIndex, compIndex, imageComponentData);
  };
  const handleWidthChange = (value: string) => {
    imageComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, imageComponentData);
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
              value={imageComponentData.title}
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
              value={imageComponentData.width}
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
          value={imageComponentData.image}
          onChange={(e) => handleImageChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default EditImageComponent;
