import React, { useState, useEffect } from "react";
import "./dist/app.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";
import Login from "./components/Login";

function App() {
  const [isPage, setPage] = useState("holydayz");

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
      console.log("sehol semmi holyday");
    }

    console.log(firstFetched);

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

  const renameFunction = async () => {
    const updateURL = "http://localhost:8000/api/login/updateUserData";
    const value = document.querySelector(".newNameInputField").value;
    console.log("renameValue is:", value);
    if (value) {
      const response = await fetch(updateURL, {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          id: "61189d5746173501f078e047", // átmenetileg beégetve
          key: "nickName",
          value: value,
        }),
      });
      const responseJson = await response.json();
      console.log("nameResponse is ", responseJson.newName);
      localStorage.setItem("name", responseJson.newName);
    } // if vége

    setPage("none");
  };

  return (
    <div className="App">
      <div id="head">
        <div className="headName" onClick={() => setPage("newName")}>
          {nameFromLocalStorage()}
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
        <div
          className="serviceButton"
          onClick={() => localStorage.removeItem("token")}
        >
          delete Storage
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

      {isPage === "newName" && (
        <div className="newName">
          <div className="newNameHead">
            <div>{nameFromLocalStorage()}</div>
            <div>please give me the new name</div>
          </div>
          <div className="newNameInput">
            <input type="text" className="newNameInputField" />
            <div className="newNameButtons">
              <div onClick={() => renameFunction()}>Okay</div>
              <div onClick={() => setPage("holydayz")}> Nope</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
