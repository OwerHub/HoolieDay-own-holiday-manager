import "../styles/dist/googleAnswer.css";
import React, { useState, useEffect } from "react";

function GoogleAnswer(props) {
  console.log(props.datas.calendarMessage, props.datas.calendarMessage.length);
  useEffect(() => {
    setTimeout(() => {
      props.close();
    }, 3000);
  }, []);
  return (
    <div className="googleAnswerOut">
      {props.datas && (
        <div className="googleAnswerIn">
          {props.datas.calendarMessage.length > 2 && (
            <div>{props.datas.calendarMessage}</div>
          )}

          <div>
            {" "}
            {props.datas.googleStatus == "200"
              ? "Holyday Saved"
              : "Sry, I cant save it"}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleAnswer;
