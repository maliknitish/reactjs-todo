import React from "react";
import "./DropdowmItem.css";

const DropdowmItem = ({ selectId, setValue, value, itemName, options }) => {
  const onDropdownChange = () => {
    const selectElement = document.getElementById(`${selectId}`);
    setValue(selectElement.value);

    if (selectId === "select1") {
      localStorage.setItem("groupingValue", selectElement.value);
    }
    if (selectId === "select2") {
      localStorage.setItem("orderingValue", selectElement.value);
    }
  };

  return (
    <div className="dropdownDiv">
      <p>{itemName}</p>
      <select
        className="dropdownSelect"
        id={selectId}
        onChange={onDropdownChange}
        value={value}
      >
        {options.map((item) => {
          return (
            <option value={item.action} key={item.action}>
              {item.action}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdowmItem;
