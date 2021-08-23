import React, { useState, useEffect } from "react";
//import "../styles/dist/welcomeScreen";

function WelcomeScreen(props) {
  const closeFunct = () => {
    console.log("in welcome Close");
    props.close();
  };

  return (
    <div className="WelcomeScreenOut">
      <div className="helloText">Hello</div>
      <div className="helloButton" onClick={() => closeFunct()}>
        Come in
      </div>
    </div>
  );
}

export default WelcomeScreen;
