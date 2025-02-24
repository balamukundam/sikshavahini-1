import React from "react";
import { ComponentType, ComponentPoem } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  poemComponentData: ComponentPoem;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditPoemComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  poemComponentData,
  onDataUpdate,
}) => {
  const handleTitleChange = (value: string) => {
    poemComponentData.title = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleTitlePosnChange = (value: string) => {
    poemComponentData.titlePosn = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleParaChange = (value: string) => {
    poemComponentData.lines = value.split("\n");
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleWidthChange = (value: string) => {
    poemComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleTagChange = (value: string) => {
    poemComponentData.tag = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleSufOddChange = (value: string) => {
    poemComponentData.OddLineSuffix = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleSufEvenChange = (value: string) => {
    poemComponentData.EvenLineSuffix = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleSufEvenTabChange = (value: number) => {
    poemComponentData.EvenLineExtraTab = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handlePreWidthChange = (value: number) => {
    poemComponentData.pwidth = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };
  const handleSufWidthChange = (value: number) => {
    poemComponentData.swidth = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
  };

  const handleCountChange = (value: boolean) => {
    poemComponentData.count = value;
    onDataUpdate(rowIndex, compIndex, poemComponentData);
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
              value={poemComponentData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            <select
              name="inputSelect"
              title="Choose your input format."
              value={poemComponentData.titlePosn}
              onChange={(e) => handleTitlePosnChange(e.target.value)}
            >
              <option value="start">Left</option>
              <option value="center">Mid</option>
              <option value="end">Right</option>
            </select>
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
              value={poemComponentData.width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="input-group"></div>
      <div className="row">
        <div className="col-2">
          <div className="input-group">
            <span className="input-group-text" id="tag-input">
              Wd
            </span>
            <input
              type="number"
              className="form-control"
              min="1"
              max="3"
              id="widthInputField"
              aria-describedby="width-input"
              value={poemComponentData.pwidth}
              onChange={(e) =>
                handlePreWidthChange(parseInt(e.target.value, 10) || 0)
              }
            />
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Tag"
            aria-label="Tag"
            aria-describedby="image-input"
            id="tagInputField"
            value={poemComponentData.tag}
            onChange={(e) => handleTagChange(e.target.value)}
          />

          <input
            type="number"
            className="form-control"
            placeholder="Tab"
            aria-label="Tab"
            aria-describedby="tab-input"
            id="tagInputField"
            value={poemComponentData.EvenLineExtraTab}
            min="0"
            max="50"
            onChange={(e) =>
              handleSufEvenTabChange(parseInt(e.target.value, 10) || 0)
            }
          />
        </div>
        <div className="col-8">
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
            {poemComponentData.lines.join("\n")}
          </textarea>
        </div>
        <div className="col-2">
          <div className="input-group">
            <span className="input-group-text" id="tag-input">
              Wd
            </span>
            <input
              type="number"
              className="form-control"
              min="1"
              max="4"
              id="widthInputField"
              aria-describedby="width-input"
              value={poemComponentData.swidth}
              onChange={(e) =>
                handleSufWidthChange(parseInt(e.target.value, 10) || 0)
              }
            />
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Tag"
            aria-label="Tag"
            aria-describedby="image-input"
            id="tagInputField"
            value={poemComponentData.OddLineSuffix}
            onChange={(e) => handleSufOddChange(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Tag"
            aria-label="Tag"
            aria-describedby="image-input"
            id="tagInputField"
            value={poemComponentData.EvenLineSuffix}
            onChange={(e) => handleSufEvenChange(e.target.value)}
          />

          <span className="input-group-text" id="tag-input">
            Count
          </span>

          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="tagInputField"
              checked={poemComponentData.count}
              onChange={(e) => handleCountChange(e.target.checked)}
            />
          </div>

          <div className="input-group mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default EditPoemComponent;
