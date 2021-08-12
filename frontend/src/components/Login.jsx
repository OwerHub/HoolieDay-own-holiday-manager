import React, { useState, useEffect } from "react";

function Login() {
  const urlScopeCalendar = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=856443790783-ur90d5sq8jvuouqjabb91npiide0k9p9.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http%3A//localhost:3000/login`;
  const loginAuth = () => {
    //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=518141647017-6qje1u36g7vs8rq5bmivm4gk5uboksld.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login`;
    window.location.href = urlScopeCalendar;
  };

  return (
    <div className="LoginButton" onClick={loginAuth}>
      This is Login Button
    </div>
  );
}

export default Login;
