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

    const cat = localStorage.getItem("token");
    console.log("localstorage", cat);
  };

  //start Sequence
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    console.log("localst", localStorageToken);
    const code = new URL(window.location.href).searchParams.get("code"); // itt megkapjuk a
    const token = { code: code };

    if (code) {
      if (!localStorageToken) {
        console.log("fetchelek");
        fetchPostCode(token);
      } else if (isHolydays) {
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
    </div>
  );
}

export default App;
