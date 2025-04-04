import React, { useState } from "react";
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
  const handleSpeedsChange = (value: string) => {
    const updatedComponent = {
      ...musicNotesComponentData,
      speeds: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };
  const handleParaChange = (value: string) => {
    const updatedComponent = {
      ...musicNotesComponentData,
      musicNotes: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };

  const handleTalamChange = (value: string) => {
    const updatedComponent = {
      ...musicNotesComponentData,
      talamSeq: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-4">
            <span className="input-group-text" id="title-input">
              Speeds
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Speeds"
              aria-label="Speeds"
              aria-describedby="speeds-input"
              id="speedsInputField"
              value={musicNotesComponentData.speeds}
              onChange={(e) => handleSpeedsChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="input-group mb-4">
            <span className="input-group-text" id="title-input">
              Talam
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Talam"
              aria-label="Talam"
              aria-describedby="talam-input"
              id="talamInputField"
              value={musicNotesComponentData.talamSeq}
              onChange={(e) => handleTalamChange(e.target.value)}
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
        value={musicNotesComponentData.musicNotes}
        onChange={(e) => handleParaChange(e.target.value)}
      />
    </>
  );
};

export default EditMusicNotesComponent;
