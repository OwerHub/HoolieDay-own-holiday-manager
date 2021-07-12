import React, { useState, useEffect } from "react";
import "../styles/dist/oneday.css";
import { months, dayTypesNew } from "../utils/progdatas";

function OneDay(props) {
  const [isDescription, setDescription] = useState(false);

  let date = props.data.date;
  let month = parseInt(date.substring(0, 2));
  let day = parseInt(date.substring(2, 4));

  /* props.dayTypes.length ? console.log(props.dayTypes) : console.log("not yet");
  console.log(dayTypesNew); */

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
