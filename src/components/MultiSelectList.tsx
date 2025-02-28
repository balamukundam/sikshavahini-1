import { useState } from "react";
interface Props {
  getSelectedLangs: (languages: string[]) => void;
}

const MultiSelectList = ({ getSelectedLangs }: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const options = [
    "Telugu",
    "Sanskrit",
    "Hindi",
    "Kannada",
    "Tamil",
    "Malayalam",
    "Bengali",
    "Oriya",
  ];

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedItems(selectedValues);
    getSelectedLangs(selectedValues);
  };

  return (
    <div>
      <label>To Languages:</label>
      <select
        multiple
        value={selectedItems}
        onChange={handleSelectionChange}
        style={{ width: "100%", height: "100px" }}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h4>Languages:</h4>
      <ul>
        {selectedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectList;
