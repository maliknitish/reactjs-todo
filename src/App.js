import { useEffect, useState } from "react";
import "./App.css";
import MessageBox from "./components/MessageBox/MessageBox";
import DropdownItem from "./components/DropdownItem/DropdowmItem.js";
import { BiAbacus } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";

function App() {
  const storedGroupingValue = localStorage.getItem("groupingValue");
  const storedOrderingValue = localStorage.getItem("orderingValue");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [isdisplayOpen, setIsDisplayOpen] = useState(false);
  // const [groupingValue, setGroupingValue] = useState(
  //   `${storedGroupingValue === undefined ? "User" : storedGroupingValue}`
  // );
  // const [orderingValue, setOrderingValue] = useState(
  //   `${storedOrderingValue === undefined ? "Priority" : storedOrderingValue}`
  // );
  const [groupingValue, setGroupingValue] = useState("User");
  const [orderingValue, setOrderingValue] = useState("Priority");

  const priorityMapping = new Map();
  priorityMapping.set("0", "No priority");
  priorityMapping.set("1", "Low");
  priorityMapping.set("2", "Medium");
  priorityMapping.set("3", "High");
  priorityMapping.set("4", "Urgent");

  // helping function for grouping
  const groupBy = (input, key) => {
    if (input === undefined) return [];
    return input.reduce((acc, currentValue) => {
      let groupKey = currentValue[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(currentValue);
      return acc;
    }, {});
  };

  const groupByPriority = () => {
    if (Object.keys(data).length === 0) return;
    const newTickets = groupBy(data.tickets, "priority");

    // changing values of 0-4 to priority values
    const newObject = {};
    for (const item in newTickets) {
      newObject[priorityMapping.get(item)] = newTickets[item];
    }

    if (orderingValue === "Priority") {
      sortByPriority(newObject);
    } else {
      sortByTitle(newObject);
    }
  };

  const groupByStatus = () => {
    if (Object.keys(data).length === 0) return;
    const newTickets = groupBy(data.tickets, "status");

    if (orderingValue === "Priority") {
      sortByPriority(newTickets);
    } else {
      sortByTitle(newTickets);
    }
  };

  const groupByUser = () => {
    if (Object.keys(data).length === 0) return;
    const newTickets = groupBy(data.tickets, "userId");

    // changing values of user IDs to User names
    const newObject = {};
    for (const item in newTickets) {
      const user = users.find((ele) => ele.id === item);
      newObject[user.name] = newTickets[item];
    }

    if (orderingValue === "Priority") {
      sortByPriority(newObject);
    } else {
      sortByTitle(newObject);
    }
  };

  const sortByPriority = (arr) => {
    let newObject = {};
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        let value = arr[key].sort(function (x, y) {
          if (x.priority > y.priority) return -1;
          return 1;
        });
        newObject[key] = value;
      }
    }

    setTickets(newObject);
  };

  const sortByTitle = (arr) => {
    let newObject = {};
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        let value = arr[key].sort(function (x, y) {
          if (x.title <= y.title) return -1;
          return 1;
        });
        newObject[key] = value;
      }
    }

    setTickets(newObject);
  };

  //passed in dropdown for options
  const groupingOptions = [
    { action: "Status" },
    { action: "Priority" },
    { action: "User" },
  ];
  const orderingOptions = [{ action: "Priority" }, { action: "Title" }];

  // fecth data from api
  useEffect(() => {
    let url = "https://api.quicksell.co/v1/internal/frontend-assignment";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setUsers(result.users);
      })
      .catch((err) => console.log(err));
  }, []);

  // show data on screen according to grouping and ordering values
  useEffect(() => {
    // use prev values of grouping and ordering if stored previously
    if (storedGroupingValue !== null) {
      setGroupingValue(storedGroupingValue);
    }

    if (storedOrderingValue !== null) {
      setOrderingValue(storedOrderingValue);
    }

    if (groupingValue === "Status") {
      groupByStatus();
    } else if (groupingValue === "Priority") {
      groupByPriority();
    } else if (groupingValue === "User") {
      groupByUser();
    }
  }, [data]);

  // // close the dropdown box when clicked outside -> Error : Not able to choose grouping and ordering
  // useEffect(() => {
  //   let dropdownBox = document.getElementById("dropdownBox");

  //   const handler = (event) => {
  //     if (isdisplayOpen === false) return;

  //     console.log("running");

  //     if (dropdownBox !== null && !dropdownBox.contains(event.target)) {
  //       setIsDisplayOpen(false);
  //     }
  //   };

  //   document.addEventListener("click", handler, true);
  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // }, [isdisplayOpen]);

  // runs when grouping value changes in dropdown
  useEffect(() => {
    if (groupingValue === "Status") {
      groupByStatus();
    } else if (groupingValue === "Priority") {
      groupByPriority();
    } else if (groupingValue === "User") {
      groupByUser();
    }
  }, [groupingValue]);

  // run when ordering value changes in dropdown
  useEffect(() => {
    if (orderingValue === "Priority") {
      sortByPriority(tickets);
    } else if (orderingValue === "Title") {
      sortByTitle(tickets);
    }
  }, [orderingValue]);

  return (
    <div>
      <div>
        <button
          className="topDisplayBtn"
          onClick={() => {
            setIsDisplayOpen(!isdisplayOpen);
          }}
        >
          <BiAbacus />
          <p>Display</p>
          <FaAngleDown />
        </button>
      </div>
      {isdisplayOpen && (
        <div id="dropdownBox" className="dropdownBox">
          <DropdownItem
            selectId="select1"
            itemName="Grouping"
            value={groupingValue}
            setValue={setGroupingValue}
            options={groupingOptions}
          />
          <DropdownItem
            selectId="select2"
            itemName="Ordering"
            value={orderingValue}
            setValue={setOrderingValue}
            options={orderingOptions}
          />
        </div>
      )}
      <div className="App">
        {Object.keys(tickets).map((item) => {
          return (
            <MessageBox
              users={users}
              key={item}
              keyName={item}
              value={tickets[item]}
              grouping={groupingValue}
              ordering={orderingValue}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
