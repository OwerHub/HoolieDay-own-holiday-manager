import React, { useState, useEffect } from "react";
import "./dist/app.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";
import Login from "./components/Login";

function App() {
  const [isIinputForm, setInputForm] = useState(false); // ezt majd kiütjük
  const [isPage, setPage] = useState("login");

  // Authorization
  const fetchPostCode = (codeForPost) => {
    const url = "http://localhost:8000/api/login/sendLoginCode";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeForPost }),
    });
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code"); // itt megkapjuk a
    const token = { code: code };

    if (code) {
      fetchPostCode(token);
    }
  }, []);

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

      {isPage === "newUser" && "new User"}

      {isPage === "holydayz" && <AllDazy></AllDazy>}

      {isPage === "newHolyDay" && (
        <InputForm close={() => setInputForm(false)}></InputForm>
      )}
    </div>
  );
}

export default App;
