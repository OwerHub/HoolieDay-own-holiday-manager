import React, { useState, useEffect } from "react";
import "./dist/app.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";
import Login from "./components/Login";

function App() {
  const [isIinputForm, setInputForm] = useState(false); // ezt majd kiütjük
  const [isPage, setPage] = useState("holydayz");

  const [isUserData, setUserData] = useState("empty");
  const [isHolydays, setHolydays] = useState();

  // Authorization and get datas
  const fetchPostCode = async (codeForPost) => {
    const url = "http://localhost:8000/api/login/sendLoginCode";

    const result = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeForPost }),
    });
    const firstFetched = await result.json();

    setUserData({
      name: firstFetched.datas.name,
      picture: firstFetched.datas.picture,
      email: firstFetched.datas.picture,
      id: firstFetched.datas._id,
    });

    if (firstFetched.datas.holydays) {
      if (firstFetched.datas.holydays.length === 0) {
        console.log("kéne valami holyday");
        setPage("newHolyDay");
      } else {
        setPage("holydays");
        console.log(firstFetched.datas.holydays);
      }
    } else {
      console.log("sehol semmi holyday");
    }

    console.log(firstFetched);

    localStorage.setItem("token", firstFetched.token);
  };

  //start Sequence
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code"); // itt megkapjuk a
    const token = { code: code };

    if (code) {
      if (isUserData === "empty") {
        fetchPostCode(token);
      } else if (isHolydays.length >= 1) {
        setPage("holydayz");
      }
    } else {
      setPage("login");
    }
  }, []);

  console.log(isPage);
  return (
    <div className="App">
      <div id="head">
        <div className="login"></div>
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

      {isPage === "login" && <Login setLogin={() => setPage()}></Login>}

      {isPage === "newUser" && "new User"}

      {isPage === "holydayz" && <AllDazy></AllDazy>}

      {isPage === "newHolyDay" && (
        <InputForm
          holydays={() => setHolydays()}
          close={() => setPage("holydays")}
        ></InputForm>
      )}
    </div>
  );
}

export default App;
