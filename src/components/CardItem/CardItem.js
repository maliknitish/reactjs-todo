import React, { useEffect } from "react";
import "./CardItem.css";
import { FaRegCircle } from "react-icons/fa";
import { PiCircleHalfFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import { AiOutlineDash } from "react-icons/ai";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdSignalCellularAlt1Bar } from "react-icons/md";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

const CardItem = ({ grouping, isOnline, nameInitials, card }) => {
  const statusMap = new Map();
  statusMap.set("Todo", <FaRegCircle className="statusIcon" />);
  statusMap.set(
    "In progress",
    <PiCircleHalfFill className="statusIcon" style={{ color: "tomato" }} />
  );
  statusMap.set(
    "Done",
    <FaCheckCircle className="statusIcon" style={{ color: "blue" }} />
  );
  statusMap.set("Backlog", <LuCircleDashed className="statusIcon" />);
  statusMap.set(
    "Canceled",
    <FaTimesCircle className="statusIcon" style={{ color: "red" }} />
  );

  const priorityMap = new Map();
  priorityMap.set(0, <AiOutlineDash className="priorityIcon" />);
  priorityMap.set(1, <MdSignalCellularAlt1Bar className="priorityIcon" />);
  priorityMap.set(2, <MdSignalCellularAlt2Bar className="priorityIcon" />);
  priorityMap.set(3, <BsBarChartFill className="priorityIcon" />);
  priorityMap.set(
    4,
    <BsExclamationSquareFill
      className="priorityIcon"
      style={{ color: "tomato" }}
    />
  );

  function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  useEffect(() => {
    const elements = document.getElementsByClassName("cardImage");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = getRandomColor();
    }
  }, []);

  return (
    <div className="cardContainer">
      {grouping !== "User" && (
        <div id="profileImage" className="cardImage">
          <p
            className={
              nameInitials.length === 1
                ? "imageText oneWordNameInitial"
                : "imageText"
            }
          >
            {nameInitials}
          </p>
          <span
            className={isOnline === true ? "imageDot Green" : "imageDot Red"}
          />
        </div>
      )}

      <p className="cardId">{card.id}</p>
      <div className="cardTitleBox">
        {(grouping === "Priority" || grouping === "User") &&
          statusMap.get(card.status)}
        {card.title.length <= 50 ? (
          <p className="cardTitle">{card.title}</p>
        ) : (
          <p className="cardTitle">{`${card.title.substr(0, 50)}...`}</p>
        )}
      </div>

      <div className="tagsBox">
        {(grouping === "Status" || grouping === "User") &&
          priorityMap.get(card.priority)}

        {card.tag.map((tagItem) => {
          return (
            <div className="featureBox" key={card.id}>
              <FaCircle className="statusIcon" />
              <p>{tagItem}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardItem;
