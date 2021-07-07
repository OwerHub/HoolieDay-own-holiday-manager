import React, { useState, useEffect } from "react";
import "../styles/dist/oneday.css";
import { months, dayTypesNew } from "../utils/progdatas";

function OneDay(props) {
  const [isDescription, setDescription] = useState(false);

  let date = props.data.date;
  let month = parseInt(date.substring(0, 2));
  let day = parseInt(date.substring(2, 4));

  /* let dateNow = new Date();
  let dateThen = new Date(`${month}/${day}/2021`);

  let difference = dateThen.getTime() - dateNow.getTime();
  let differenceInDay = Math.ceil(difference / (1000 * 3600 * 24));
 */

  /*  let classTry = "edcolor";
  let classname = dayTypes[props.data.dayType];
  console.log(dayTypes[props.data.dayType].replace(/\s/g, "").toLowerCase()); */

  console.log(
    `${props.data.name}  is  ${!!parseInt(props.selectByte[props.data.dayType])}`
  );

  return (
    <div
      className="onedayDiv"
      style={{
        backgroundColor: dayTypesNew[props.data.dayType].color,
        display: !!parseInt(props.selectByte[props.data.dayType]) ? "block" : "none",
      }}
    >
      <div className="nameDiv">
        <div className="nameUp">{dayTypesNew[props.data.dayType].name}</div>
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
