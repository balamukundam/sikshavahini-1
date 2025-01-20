import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

const DropDown = ({ items, heading, onSelectItem }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {heading}
        </button>

        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li>
              <a
                className="dropdown-item"
                key={item}
                onClick={() => {
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
