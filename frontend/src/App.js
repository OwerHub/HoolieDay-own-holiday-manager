import React, { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/inputform";
import AllDazy from "./components/AllDayz";

function App() {
  const [isIinputForm, setInputForm] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setInputForm(!isIinputForm)}>
        {isIinputForm ? "Show the Holydays" : "New Input"}
      </button>

      {isIinputForm ? (
        <InputForm close={() => setInputForm(false)}></InputForm>
      ) : (
        <AllDazy></AllDazy>
      )}
    </div>
  );
}

export default App;
