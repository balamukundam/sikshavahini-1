import React from "react";
import { ComponentType, ComponentMusicNotes } from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  musicNotesComponentData: ComponentMusicNotes;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditMusicNotesComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  musicNotesComponentData,
  onDataUpdate,
}) => {
  const handleTitleChange = (value: string) => {
    musicNotesComponentData.title = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
  };
  const handleParaChange = (value: string) => {
    musicNotesComponentData.musicNotes = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
  };

  const handleWidthChange = (value: string) => {
    musicNotesComponentData.width = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
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
              value={musicNotesComponentData.title}
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
              value={musicNotesComponentData.width}
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
        {musicNotesComponentData.musicNotes}
      </textarea>
    </>
  );
};

export default EditMusicNotesComponent;
