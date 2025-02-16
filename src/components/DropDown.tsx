import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  preselectedIndex: number;
  onSelectItem: (item: string) => void;
}

const DropDown = ({
  items,
  heading,
  preselectedIndex,
  onSelectItem,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // preselectedIndex = preselectedIndex;

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {preselectedIndex < 0 && selectedIndex < 0
            ? heading
            : preselectedIndex >= 0
            ? items[preselectedIndex]
            : items[selectedIndex]}
        </button>

        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                onClick={() => {
                  preselectedIndex = index;
                  setSelectedIndex(index);
                  onSelectItem(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
