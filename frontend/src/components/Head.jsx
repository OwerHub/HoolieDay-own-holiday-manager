import "../styles/dist/head.css";
//import React, { useState, useEffect } from "react";

function HeadFunct(props) {
  console.log("props in Head", props.isPage);

  return (
    <div id="head" className="testHead">
      <div className="userNameOrLoginPage">
        {localStorage.getItem("token") !== null ? (
          <div
            className={` headName headButton   ${
              props.isPage === "userDatasModal" && "selectedHead"
            }`}
            onClick={() => props.setPage("userDatasModal")}
          >
            <span>Hello {localStorage.getItem("name")}</span>
          </div>
        ) : (
          <div
            className="headName headButton"
            onClick={() => props.setPage("login")}
          >
            Please login or refresh the page
          </div>
        )}
        {/* <div
			className="headName headButton"
			onClick={() => props.setPage("userDatasModal")}
		>
			{nameFromLocalStorage()}
		</div> */}
      </div>

      <div
        className={`NewButton headButton ${
          props.isPage === "newHolyDay" && "selectedHead"
        }`}
        onClick={() => props.setPage("newHolyDay")}
      >
        new Holyday
      </div>

      <div
        className={`headButton ${props.isPage === "holydayz" && "selectedHead"}`}
        onClick={() => props.setPage("holydayz")}
      >
        HolyDayz
      </div>
    </div>
  );
}

export default HeadFunct;
