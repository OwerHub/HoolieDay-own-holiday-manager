import React, { useState, useEffect } from "react";
import "../styles/oneday-temp.css";
import { months } from "../utils/progdatas";

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
  return (
    <div className="onedayDiv">
      <div>{props.data.name}</div>

      <div>
        {/*  <span>dátum: </span> */}
        <span>{months[month - 1]} </span>
        <span>{day}</span>
      </div>

      <div>
        <span>teendő: </span>
        <span>{props.data.celebrate}</span>
      </div>

      <div>
        <span>Visszalévő napok : </span>
        <span>{props.data.remaining}</span>
      </div>

      {/*  <div>year : {props.data.year}</div> */}

      <button onClick={() => setDescription(!isDescription)}>
        {" "}
        {isDescription ? "mutass kevesebbet" : "mutass többet"}
      </button>

      {isDescription ? <div> {props.data.description} </div> : ""}
    </div>
  );
}

export default OneDay;
