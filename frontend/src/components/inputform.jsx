import React, { useState, useEffect } from "react";
import { months, dayTypesNew } from "../utils/progdatas.js";
import "../styles/dist/inputform.css";

function InputForm(props) {
  const [isMax, setMax] = useState(31);
  const [isValidate, setValidate] = useState(false);

  const monthLenght = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function twoDigits(e) {
    if (e < 10) {
      e = "0" + e.toString();
    } else e = e.toString();
    return e;
  } // két számjegyre húzza fel az értékeket

  async function sendDatas() {
    let object = {};

    object.name = document.querySelector(".nameInput").value;

    let monthValue = document.querySelector(".monthDropDown").value;
    let dayValue = document.querySelector(".dayInput").value;
    object.date = twoDigits(monthValue) + twoDigits(dayValue);

    object.picture = "none";
    object.celebrate = document.querySelector(".celebrateMethodInput").value;
    object.description = document.querySelector(".descriptionInput").value;
    object.type = document.querySelector(".typeDropDown").value;
    /* 
    console.log(object); */

    const urlMongo = "http://localhost:8000/api/holyday/newHolyday";
    const urlFile = "http://localhost:8000/upload";
    const response = await fetch(urlMongo, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    props.close();
  }

  function lengthChange() {
    setMax(monthLenght[document.querySelector(".monthDropDown").value - 1]);
  }

  function validate() {
    const forInputs = () => {
      let validNum = 0;

      for (const field of document.querySelectorAll("input")) {
        if (field.value.length > 0) {
          validNum = validNum + 1;
        }
      }

      return document.querySelectorAll("input").length / validNum;
    };

    setValidate(
      forInputs() === 1 && document.querySelector(".dayInput").validity.valid
    );
    console.log(isValidate);
  }

  return (
    <div className="inputModal">
      <div className="form">
        <h1>New Day</h1>

        <div className="nameInputCont inputCont">
          <div className="inputHead">Name of the Holyday: </div>
          <input
            type="text"
            className="nameInput"
            onChange={() => validate()}
            required
          />
        </div>

        <div className="dateCont inputCont">
          <div className="inputHead"> Date</div>
          <div>
            <select
              name="month"
              className="monthDropDown"
              onChange={() => lengthChange()}
            >
              {months.map((month, iterator) => (
                <option key={"month" + iterator} value={iterator + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            className="dayInput"
            min="1"
            max={isMax}
            required
            onChange={() => validate()}
          />
        </div>

        <div className="celebrateSMethodCont inputCont">
          <div className="inputHead">Celebrate Method:</div>
          <input
            type="text"
            className="celebrateMethodInput required"
            onChange={() => validate()}
          />
        </div>

        <div className="dayTypeCont inputCont">
          <div className="inputHead">Type of the Day</div>
          <select
            name="dayTypes"
            className="typeDropDown"
            onChange={() => validate()}
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

        <div className="descriptionCont inputCont">
          <div className="inputHead">Description</div>
          <input
            type="text"
            className="descriptionInput"
            onChange={() => validate()}
          />
        </div>

        <button onClick={sendDatas} className="sendButton" disabled={!isValidate}>
          Elküld
        </button>

        {/*   <button onClick={() => validate()}>Validate</button> */}

        <div className="closeButton" onClick={() => props.close()}>
          X
        </div>
      </div>
    </div>
  );
}

export default InputForm;
