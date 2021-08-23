import React, { useState, useEffect } from "react";
//import "../styles/dist/welcomeScreen";

function WelcomeScreen(props) {
  return (
    <div className="WelcomeScreenOut">
      <div className="helloText">Hello</div>
      <div className="helloButton" onClick={() => props.close()}>
        Come in
      </div>
    </div>
  );
}

export default WelcomeScreen;
