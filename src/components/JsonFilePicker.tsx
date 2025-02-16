import React from "react";

interface Props {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JsonFilePicker = ({ handleFileChange }: Props) => {
  return (
    <>
      <label htmlFor="filePicker">Load JSON File</label>
      <input
        className="form-control d-none"
        type="file"
        id="filePicker"
        accept=".json"
        onChange={handleFileChange}
      />
    </>
  );
};

export default JsonFilePicker;
