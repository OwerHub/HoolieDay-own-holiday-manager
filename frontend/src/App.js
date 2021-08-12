import React, { useState, useEffect } from "react";
import "./dist/app.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";
import Login from "./components/Login";

function App() {
  const [isIinputForm, setInputForm] = useState(false);
  const [isGoogleCode, setGoogleCode] = useState(null);
  // Authorization

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code"); // itt megkapjuk a
    const token = { code: code };
    setGoogleCode(token);
  }, []);

  console.log(isGoogleCode);

  return (
    <div className="App">
      <div id="head">
        <div className="login">
          <Login></Login>
        </div>
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

      <AllDazy></AllDazy>

      {isIinputForm ? <InputForm close={() => setInputForm(false)}></InputForm> : ""}
    </div>
  );
}

export default App;
