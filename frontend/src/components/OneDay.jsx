import React, { useState, useEffect } from "react";
import "../styles/dist/oneday.css";
import { months } from "../utils/progdatas";
import GoogleAnswer from "./GoogleAnswer";
import FetchModule from "../utils/fetch";
import LoadingWave from "./LoadingWave";

function OneDay(props) {
  const [isModalType, setModalType] = useState("none");
  const [isGoogleAnswer, setGoogleAnswer] = useState();
  const [isLoading, setLoading] = useState(false);

  let date = props.data.date;
  let month = parseInt(date.substring(0, 2));
  let day = parseInt(date.substring(2, 4));

  const fieldsOfInput = ["name", "celebrate", "description"];

  const deleteFunct = async () => {
    const urlDeleteHolyDay = "http://localhost:8000/api/holyday/deleteHolyday";

    const response = await FetchModule(urlDeleteHolyDay, "DELETE", {
      id: props.data._id,
    });

    console.log("deleteResponse: ", response);

    props.refresh();
    setModalType("none");
  };

  //console.log("props.data", props.data);
  const sendToGoogleFunct = async () => {
    setLoading(true);
    let thisYear = new Date().getFullYear();
    const urlFetchToGoogle = "http://localhost:8000/api/holyday/saveToGoogle";

    if (props.data.year === "next") {
      thisYear++;
    }

    const date = `${thisYear}-${props.data.date.substring(
      0,
      2
    )}-${props.data.date.substring(2, 4)}`;

    //console.log("date is", date);

    const hoolieDayDatas = {
      id: props.data._id,
      date: date,
      summary: `${props.dayTypes[props.data.type].name} ${props.data.name}`,
      description: props.data.celebrate,
      type: props.data.type,
    };

    const response = await FetchModule(urlFetchToGoogle, "POST", hoolieDayDatas);

    /* const response = await fetch(urlFetchToGoogle, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.data._id }),
    }); */
    setGoogleAnswer(response);
    setLoading(false);
    setModalType("googleAnswer");
    console.log(response);
  };

  const updateFunct = async (type) => {
    const inputValue = document.querySelector(`.modalInput${type}`).value;

    inputValue && console.log(type, inputValue);

    if (inputValue) {
      const urlUpdate = "http://localhost:8000/api/holyday/modifyHolyday";

      const response = await FetchModule(urlUpdate, "PUT", {
        id: props.data._id,
        key: type,
        value: inputValue,
      });

      console.log("response in updateFunct", response);
    }

    setModalType("none");
    props.refresh();
  };

  return (
    <div
      className="onedayDiv"
      style={{
        border: ` 3px solid ${
          props.dayTypes.length && props.dayTypes[props.data.type].color
        }`,
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

      <div
        className="toDoDiv"
        style={{
          color: props.dayTypes.length && props.dayTypes[props.data.type].color,
        }}
      >
        <span>{props.data.celebrate}</span>
      </div>

      <div className="remainingDiv">
        <div className="numberUp">LEFT</div>
        <div className="remainNumber">
          <span>{props.data.remaining}</span>
        </div>
        <div className="numberDown">DAYZ</div>
      </div>

      <div className="description">{props.data.description}</div>

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

        <div
          className="sendGoogleButton onedayButton"
          onClick={() => sendToGoogleFunct()}
        >
          Send To{" "}
        </div>
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

      {isModalType === "googleAnswer" && (
        <GoogleAnswer
          datas={isGoogleAnswer}
          close={() => setModalType("none")}
        ></GoogleAnswer>
      )}

      {isLoading && <LoadingWave></LoadingWave>}
    </div>
  );
}

export default OneDay;
