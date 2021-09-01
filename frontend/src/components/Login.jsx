import React, { useState, useEffect } from "react";
import "../styles/dist/login.css";

function Login() {
  const urlScopeCalendar = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=856443790783-ur90d5sq8jvuouqjabb91npiide0k9p9.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar%20openid%20email%20profile&access_type=offline&redirect_uri=http%3A//localhost:3000/login`;
  const urlScopeWithoutCalendar = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=856443790783-ur90d5sq8jvuouqjabb91npiide0k9p9.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login`;
  const loginAuth = () => {
    //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=518141647017-6qje1u36g7vs8rq5bmivm4gk5uboksld.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login`;
    window.location.href = urlScopeCalendar;
  };

  return (
    <div className="loginOutDiv">
      <div className="loginUpper">
        <div className="welcomeDiv">Welcome in HoolieDays</div>
        <div>0.9.5 Vizsgaverzió</div>
      </div>
      <div className="LoginButton" onClick={loginAuth}>
        Login with Google
      </div>
      <div className="loginBottomText">
        <p>
          Ha a bejelentkezés után nem látod fent a neved, kérlek frissítsd az oldalt,
          vagy kattints rá bármelyik gombra
        </p>
        <p>De ez nem fog megtörténni, mert jó vagyok :D</p>
      </div>
    </div>
  );
}

export default Login;
