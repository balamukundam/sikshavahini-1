import React, { useState } from "react";

interface Props {
  onTitleChange: (item: string) => void;
  value: string;
}

const TitleInput = ({ value, onTitleChange }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onTitleChange(`${value}`);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="title-input">
          Title
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          aria-label="Title"
          aria-describedby="title-input"
          id="inputField"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default TitleInput;
