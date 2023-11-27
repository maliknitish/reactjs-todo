import React, { useEffect } from "react";
import "./BoxHeader.css";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
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

const BoxHeader = ({ grouping, users, getInitials, boxStatus, boxSize }) => {
  const statusMap = new Map();
  statusMap.set(
    "Todo",
    <FaRegCircle className="statusIcon" style={{ color: "#9e9e9e" }} />
  );
  statusMap.set(
    "In progress",
    <PiCircleHalfFill className="statusIcon" style={{ color: "tomato" }} />
  );
  statusMap.set(
    "Done",
    <FaCheckCircle className="statusIcon" style={{ color: "blue" }} />
  );
  statusMap.set(
    "Backlog",
    <LuCircleDashed className="statusIcon" style={{ color: "#9e9e9e" }} />
  );
  statusMap.set(
    "Canceled",
    <FaTimesCircle className="statusIcon" style={{ color: "red" }} />
  );

  const priorityMap = new Map();
  priorityMap.set(
    "No priority",
    <AiOutlineDash className="statusIcon" style={{ color: "#9e9e9e" }} />
  );
  priorityMap.set(
    "Low",
    <MdSignalCellularAlt1Bar
      className="statusIcon"
      style={{ color: "#9e9e9e" }}
    />
  );
  priorityMap.set(
    "Medium",
    <MdSignalCellularAlt2Bar
      className="statusIcon"
      style={{ color: "#9e9e9e" }}
    />
  );
  priorityMap.set(
    "High",
    <BsBarChartFill className="statusIcon" style={{ color: "#9e9e9e" }} />
  );
  priorityMap.set(
    "Urgent",
    <BsExclamationSquareFill
      className="statusIcon"
      style={{ color: "tomato" }}
    />
  );

  const nameInitials = getInitials(boxStatus);
  const user = users.find((item) => item.name === boxStatus);

  function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  useEffect(() => {
    const elements = document.getElementsByClassName("BoxUserImage");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = getRandomColor();
    }
  }, []);

  return (
    <div className="headerContainer">
      <div className="flex">
        {grouping === "Status" && statusMap.get(boxStatus)}
        {grouping === "Priority" && priorityMap.get(boxStatus)}

        {grouping === "User" && (
          <div className="BoxUserImage">
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
              className={`${
                user && user.available === true
                  ? "boxImageDot Green"
                  : "boxImageDot Red"
              }${
                nameInitials.length === 1 ? " boxSingleNameInitialImageDot" : ""
              }`}
            />
          </div>
        )}

        <p className="boxStatus">{boxStatus}</p>
        <p className="boxSize">{boxSize}</p>
      </div>
      <div className="flex">
        <FaPlus className="boxRightIcon" />
        <BsThreeDots className="boxRightIcon" />
      </div>
    </div>
  );
};

export default BoxHeader;
