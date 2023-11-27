import React from "react";
import CardItem from "../CardItem/CardItem.js";
import BoxHeader from "../BoxHeader/BoxHeader.js";
import "./MessageBox.css";

const MessageBox = ({ users, keyName, value, grouping, ordering }) => {
  function getInitials(name) {
    const nameArray = name.split(" ");
    const firstName = nameArray[0].charAt(0).toUpperCase();
    const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    if (nameArray.length === 1) return firstName;
    return firstName + lastName;
  }

  return (
    <div className="messsageContainer">
      <BoxHeader
        boxStatus={keyName}
        users={users}
        grouping={grouping}
        getInitials={getInitials}
        boxSize={value.length}
      />
      {value.map((item) => {
        const user = users.find((ele) => ele.id === item.userId);
        const nameInitials = getInitials(user.name);
        return (
          <CardItem
            key={item.id}
            className="carditem"
            grouping={grouping}
            ordering={ordering}
            card={item}
            nameInitials={nameInitials}
            isOnline={user.available}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
