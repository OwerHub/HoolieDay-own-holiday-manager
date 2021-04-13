import React, { useState, useEffect } from "react";
import "./dist/app.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";

function App() {
  const [isIinputForm, setInputForm] = useState(false);
  return (
    <div className="App">
      <div id="head">
        <div id="orderSelect"></div>
        <div id="centerDiv">
          {isIinputForm ? (
            <div id="holydaysButton">
              <div
                id="HolydaysButton"
                className="headCenterButtons"
                onClick={() => setInputForm(!isIinputForm)}
              >
                Holydays
              </div>
              <div
                id="HolydaysButton"
                className="headCenterButtons"
                onClick={() => setInputForm(!isIinputForm)}
              >
                later...
              </div>
            </div>
          ) : (
            <div
              id="newInputButton"
              className="headCenterButtons"
              onClick={() => setInputForm(!isIinputForm)}
            >
              New Input
            </div>
          )}
        </div>
        <div id="typeSelect"></div>
      </div>

      {isIinputForm ? (
        <InputForm close={() => setInputForm(false)}></InputForm>
      ) : (
        <AllDazy></AllDazy>
      )}
    </div>
  );
}

export default App;
