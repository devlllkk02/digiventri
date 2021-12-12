import React from "react";
import "./Dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
function DropDown({ list, dropdownItem, setDropdownItem }) {
  return (
    <div className="dropdown">
      <select
        value={dropdownItem}
        onChange={(e) => setDropdownItem(e.target.value)}
      >
        {list.map((list, index) => (
          <option key={index}>{list}</option>
        ))}
      </select>
      <div className="down__arrow">
        <FontAwesomeIcon className="down__arrow__icon" icon={faChevronDown} />
      </div>
    </div>
  );
}

export default DropDown;
