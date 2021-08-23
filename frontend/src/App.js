import React, { useState, useEffect } from "react";
import "./dist/app.css";

import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";
import Login from "./components/Login";
import SetUserModal from "./components/SetUserDatasModal";
import WelcomeScreen from "./components/WelcomeScreen";

import FetchModule from "./utils/fetch";

function App() {
  const [isPage, setPage] = useState();

  const [isUserData, setUserData] = useState();
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
      console.log("sehol semmi holyday ");
    }

    //console.log(firstFetched);

    localStorage.setItem("token", firstFetched.token);
    localStorage.setItem("name", firstFetched.datas.name);
    localStorage.setItem("picture", firstFetched.datas.picture);

    const cat = localStorage.getItem("token");
    console.log("localstorage", cat);
  };

  //start Sequence
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    //console.log("localst in UseEffect", localStorageToken);
    const code = new URL(window.location.href).searchParams.get("code"); // itt megkapjuk a
    console.log(code);
    const token = { code: code };

    if (code) {
      if (localStorageToken === null) {
        console.log("fetchelek");
        setPage("login");
        fetchPostCode(token);
      } else if (isHolydays) {
        setPage("holydayz");
      }
    } else {
      setPage("login");
    }
  }, []);

  console.log("localstorage name is ", localStorage.getItem("name"));

  const nameFromLocalStorage = () => {
    if (localStorage.getItem("token") !== null) {
      return ` Hello ${localStorage.getItem("name")}`;
    }
    return "Please login or refresh the page";
  };

  const logoutFunct = () => {
    localStorage.clear();
    setPage("login");
  };

  return (
    <div className="App">
      <div id="head">
        <div className="userNameOrLoginPage">
          <div className="headName" onClick={() => setPage("userDatasModal")}>
            {nameFromLocalStorage()}
          </div>
        </div>

        <div className="NewButton" onClick={() => setPage("newHolyDay")}>
          new Holyday
        </div>

        <div className="" onClick={() => setPage("holydayz")}>
          HolyDayz
        </div>
      </div>
      <div className="serviceHead">
        <div className="serviceButton" onClick={() => setPage("login")}>
          login
        </div>
      </div>

      {isPage === "login" && <Login setLogin={() => setPage()}></Login>}

      {isPage === "newUser" && "new User"}

      {isPage === "holydayz" && <AllDazy></AllDazy>}

      {isPage === "newHolyDay" && (
        <InputForm
          holydays={() => setHolydays()}
          close={() => setPage("holydayz")}
        ></InputForm>
      )}

      {isPage === "userDatasModal" && (
        <SetUserModal
          nameFromLocalStorage={nameFromLocalStorage}
          close={() => setPage("holydayz")}
          logout={() => logoutFunct()}
        ></SetUserModal>
      )}

      {isPage === "welcomeScreen" && (
        <WelcomeScreen close={() => setPage("holydayz")}></WelcomeScreen>
      )}
    </div>
  );
}

export default App;
