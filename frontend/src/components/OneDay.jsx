import React, { useState, useEffect } from "react";
import "../styles/dist/oneday.css";
import { months, dayTypesNew } from "../utils/progdatas";

function OneDay(props) {
  //console.log(props.data);
  const [isDescription, setDescription] = useState(false);

  let date = props.data.date;
  let month = parseInt(date.substring(0, 2));
  let day = parseInt(date.substring(2, 4));

  /* props.dayTypes.length ? console.log(props.dayTypes) : console.log("not yet");
  console.log(dayTypesNew); */

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
  };

  return (
    <div
      className="onedayDiv"
      style={{
        //backgroundColor: dayTypesNew[props.data.dayType].color,
        backgroundColor:
          props.dayTypes.length && props.dayTypes[props.data.type].color,
        display: !!parseInt(props.selectByte[props.data.type]) ? "block" : "none",
      }}
    >
      <div className="nameDiv">
        {/* <div className="nameUp">{dayTypesNew[props.data.type].name}</div> */}
        <div className="nameUp">
          {props.dayTypes.length && props.dayTypes[props.data.type].name}
        </div>
        <div className="nameBig">{props.data.name}</div>
      </div>

      <div className="dateDiv">
        {/*  <span>dátum: </span> */}
        <span>{months[month - 1]} </span>
        <span>{day}</span>
      </div>

      <div className="toDoDiv">
        {/*    <span>teendő: </span> */}
        <span>{props.data.celebrate}</span>
      </div>

      <div className="remainingDiv">
        <div className="numberUp">LEFT</div>
        <div className="remainNumber">
          <span>{props.data.remaining}</span>
        </div>
        <div className="numberDown">DAYZ</div>
      </div>

      <div className="deleteButton" onClick={() => deleteFunct()}>
        Delete
      </div>

      {/*  <div>year : {props.data.year}</div> */}

      <button onClick={() => setDescription(!isDescription)} className="hide">
        {" "}
        {isDescription ? "mutass kevesebbet" : "mutass többet"}
      </button>

      {isDescription ? <div> {props.data.description} </div> : ""}
    </div>
  );
}

export default OneDay;
