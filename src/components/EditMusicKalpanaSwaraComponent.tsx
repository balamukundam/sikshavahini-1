import React, { useState } from "react";
import {
  ComponentType,
  ComponentMusicLKalpanaNotes,
} from "../services/dataTypes";

interface Props {
  rowIndex: number;
  compIndex: number;
  musicKalpanaSwaraComponentData: ComponentMusicLKalpanaNotes;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const EditMusicKalpanaSwaraComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  musicKalpanaSwaraComponentData,
  onDataUpdate,
}) => {
  const handleNotesChange = (value: string) => {
    const updatedComponent = {
      ...musicKalpanaSwaraComponentData,
      musicNotes: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };
  const handlePallaviChange = (value: string) => {
    const updatedComponent = {
      ...musicKalpanaSwaraComponentData,
      musicPallavi: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };

  const handleTalamChange = (value: string) => {
    const updatedComponent = {
      ...musicKalpanaSwaraComponentData,
      talamSeq: value,
    };
    onDataUpdate(rowIndex, compIndex, updatedComponent);
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <span className="input-group-text" id="title-input">
            Ragam
          </span>
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
              value={musicKalpanaSwaraComponentData.talamSeq}
              onChange={(e) => handleTalamChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      <h4>Notes</h4>
      <textarea
        rows={8}
        cols={0}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Add text"
        style={{ width: "100%" }}
        value={musicKalpanaSwaraComponentData.musicNotes}
        onChange={(e) => handleNotesChange(e.target.value)}
      />

      <h4>Pallavi</h4>
      <textarea
        rows={8}
        cols={0}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Add text"
        style={{ width: "100%" }}
        value={musicKalpanaSwaraComponentData.musicPallavi}
        onChange={(e) => handlePallaviChange(e.target.value)}
      />
    </>
  );
};

export default EditMusicKalpanaSwaraComponent;
