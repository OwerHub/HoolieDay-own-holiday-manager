import React, { useState, useEffect } from "react";
//import "../styles/dist/welcomeScreen";

function WelcomeScreen(props) {
  const closeFunct = () => {
    console.log("in welcome Close");
    props.close();
  };

  return (
    <div className="WelcomeScreenOut">
      <div className="helloText">Hello User, Welcome in HoolieDays</div>
      <div>Tudom, hogy rosszul írtam a Holiday-s mindenhol </div>
      <div
        className="helloButton rainbowButtonOut height1rem"
        onClick={() => closeFunct()}
      >
        <span>Enter</span>
      </div>
    </div>
  );
}

export default WelcomeScreen;
