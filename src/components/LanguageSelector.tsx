import React from "react";

interface Props {
  OnSelectChange: (item: string) => void;
}

const LanguageSelector = ({ OnSelectChange }: Props) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected value from the event
    OnSelectChange(event.target.value);
  };

  return (
    <>
      <select
        name="inputSelect"
        title="Choose your input format."
        onChange={handleSelectChange}
      >
        <optgroup label="Indian">
          <option value="telugu">Telugu (అ)</option>
          <option value="devanagari">Devanagari (अ)</option>
          <option value="bengali">Bengali (অ)</option>
          <option value="gurmukhi">Gurmukhi (ਅ)</option>
          <option value="gujarati">Gujarati (અ)</option>
          <option value="oriya">Oriya (ଅ)</option>
          <option value="tamil">Tamil (அ)</option>
          <option value="kannada">Kannada (ಅ)</option>
          <option value="malayalam">Malayalam (അ)</option>
        </optgroup>
        <optgroup label="Roman">
          <option value="iast">IAST</option>
          <option value="kolkata">Kolkata</option>
          <option value="itrans">ITRANS</option>
          <option value="hk">Harvard-Kyoto</option>
          <option value="slp1">SLP</option>
          <option value="english">English (Lipi)</option>
        </optgroup>
      </select>
    </>
  );
};

export default LanguageSelector;
