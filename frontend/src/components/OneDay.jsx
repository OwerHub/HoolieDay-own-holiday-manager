import React, { useState, useEffect } from "react";
import "../styles/dist/oneday.css";
import { months, dayTypesNew } from "../utils/progdatas";

function OneDay(props) {
  const [isModalType, setModalType] = useState("none");

  let date = props.data.date;
  let month = parseInt(date.substring(0, 2));
  let day = parseInt(date.substring(2, 4));

  const fieldsOfInput = ["name", "celebrate", "description"];

  const deleteFunct = async () => {
    const urlDeleteHolyDay = "http://localhost:8000/api/holyday/deleteHolyday";

    const response = await fetch(urlDeleteHolyDay, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.data._id }),
    });

    console.log(response);

    props.refresh();
    setModalType("none");
  };

  const sendToGoogleFunct = async () => {
    const urlFetchToGoogle = "http://localhost:8000/api/holyday/fetchToGoogle";

    const response = await fetch(urlFetchToGoogle, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.data._id }),
    });

    console.log(response);
  };

  const updateFunct = async (type) => {
    const inputValue = document.querySelector(`.modalInput${type}`).value;

    inputValue && console.log(type, inputValue);

    if (inputValue) {
      const urlUpdate = "http://localhost:8000/api/holyday/modifyHolyday";

      const response = await fetch(urlUpdate, {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          id: props.data._id,
          key: type,
          value: inputValue,
        }),
      });

      console.log(response);
    }

    setModalType("none");
  };

  return (
    <div
      className="onedayDiv"
      style={{
        backgroundColor:
          props.dayTypes.length && props.dayTypes[props.data.type].color,
        display: !!parseInt(props.selectByte[props.data.type]) ? "block" : "none",
      }}
    >
      <div className="nameDiv">
        <div className="nameUp">
          {props.dayTypes.length && props.dayTypes[props.data.type].name}
        </div>
        <div className="nameBig">{props.data.name}</div>
      </div>

      <div className="dateDiv">
        <span>{months[month - 1]} </span>
        <span>{day}</span>
      </div>

      <div className="toDoDiv">
        <span>{props.data.celebrate}</span>
      </div>

      <div className="remainingDiv">
        <div className="numberUp">LEFT</div>
        <div className="remainNumber">
          <span>{props.data.remaining}</span>
        </div>
        <div className="numberDown">DAYZ</div>
      </div>

      <div className="oneDayButtonGroup">
        <div
          className="deleteButton onedayButton"
          onClick={() => setModalType("delete")}
        >
          Delete
        </div>

        <div
          className="updateButton onedayButton"
          onClick={() => setModalType("update")}
        >
          Update
        </div>

        <div className="sendGoogleButton onedayButton">Send To </div>
      </div>

      {isModalType === "delete" && (
        <div className="deleteModal">
          <div className="deleteHead">Are You Sure Delete This Div?</div>
          <div className="deleteButtons">
            <div onClick={() => deleteFunct()}>yess, of course</div>
            <div onClick={() => setModalType("none")}>no way</div>
          </div>
        </div>
      )}

      {isModalType === "update" && (
        <div className="updateModal">
          <div className="updateModalHead">Update</div>
          <div className="updateInputs">
            {fieldsOfInput.map((inputData, iterator) => (
              <div className="inputBlock" key={iterator}>
                <input
                  className={"modalInput" + inputData}
                  type="text"
                  placeholder={props.data[inputData]}
                />
                <div
                  className="updateFieldsButton"
                  onClick={() => updateFunct(inputData)}
                >
                  update
                </div>
              </div>
            ))}
          </div>
          <div className="closeUpdate" onClick={() => setModalType("none")}>
            x
          </div>
        </div>
      )}
    </div>
  );
}

export default OneDay;
