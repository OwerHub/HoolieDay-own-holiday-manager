import React, { useState } from "react";
import { months, dayTypesNew } from "../utils/progdatas.js";
import "../styles/dist/inputform.css";

function InputForm(props) {
  console.log("inputform Open");

  const [isMax, setMax] = useState(30);

  function twoDigits(e) {
    if (e < 10) {
      e = "0" + e.toString();
    } else e = e.toString();
    return e;
  } // két számjegyre húzza fel az értékeket

  function sendDatas() {
    let object = {};

    object.name = document.querySelector(".nameInput").value;

    let monthValue = document.querySelector(".monthDropDown").value;

    let dayValue = document.querySelector(".dayInput").value;
    object.date = twoDigits(monthValue) + twoDigits(dayValue);

    object.picture = "none";
    object.celebrate = document.querySelector(".celebrateMethodInput").value;
    object.description = document.querySelector(".descriptionInput").value;
    object.dayType = document.querySelector(".typeDropDown").value;
    /* 
    console.log(object); */

    fetch("http://localhost:8000/upload", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    props.close();
  }

  return (
    <div className="inputform">
      <div className="nameInputDiv">
        <div>Name of the Holyday: </div>
        <input type="text" className="nameInput" />
      </div>

      <div className="date">
        <div>date</div>
        <select name="month" className="monthDropDown">
          {months.map((month, iterator) => (
            <option key={"month" + iterator} value={iterator + 1}>
              {month}
            </option>
          ))}
        </select>
        <input type="number" className="dayInput" min="1" max={isMax} />
      </div>

      <div className="celebrateMethod">
        <div>Celebrate Method:</div>
        <input type="text" className="celebrateMethodInput" />
      </div>

      <div className="dayType">
        <div>Type of the Day</div>
        <select
          name="dayTypes"
          className="typeDropDown"
          style={{ backgroundColor: dayTypesNew[0].color, color: "white" }}
        >
          {dayTypesNew.map((type, iterator) => (
            <option
              key={"type" + iterator}
              value={iterator}
              style={{ backgroundColor: type.color, color: "white" }}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="description">
        <div>Description</div>
        <input type="text" className="descriptionInput" />
      </div>

      <button onClick={sendDatas}> Elküld</button>

      <div className="closeButton" onClick={() => props.close()}>
        X
      </div>
    </div>
  );
}

export default InputForm;
