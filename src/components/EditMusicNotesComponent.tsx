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

const noteOptions = [
  { label: "E", value: 76 },
  { label: "D#", value: 75 },
  { label: "D", value: 74 },
  { label: "C#", value: 73 },
  { label: "C", value: 72 },
  { label: "B", value: 71 },
  { label: "A#", value: 70 },
  { label: "A", value: 69 },
  { label: "G#", value: 68 },
  { label: "G", value: 67 },
  { label: "F#", value: 66 },
  { label: "F", value: 65 },
  { label: "E", value: 64 },
  { label: "D#", value: 63 },
  { label: "D", value: 62 },
  { label: "C#", value: 61 },
  { label: "C", value: 60 },
  { label: "B", value: 59 },
  { label: "A#", value: 58 },
  { label: "A", value: 57 },
  { label: "G#", value: 56 },
  { label: "G", value: 55 },
  { label: "F#", value: 54 },
];

const EditMusicNotesComponent: React.FC<Props> = ({
  rowIndex,
  compIndex,
  musicNotesComponentData,
  onDataUpdate,
}) => {
  const handleSpeedsChange = (value: string) => {
    musicNotesComponentData.speeds = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
  };
  const handleParaChange = (value: string) => {
    musicNotesComponentData.musicNotes = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
  };

  const handleTalamChange = (value: string) => {
    musicNotesComponentData.talamSeq = value;
    onDataUpdate(rowIndex, compIndex, musicNotesComponentData);
  };

  return (
    <>
      <div className="row">
        <div className="col-3">
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
        <div className="col-3">
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
