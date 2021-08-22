import React, { useState, useEffect } from "react";
import FetchModule from "../utils/fetch";

function InputTypeForm(props) {
  const fetchPutTpyes = (data) => {
    const inputValue = document.querySelector(`.typeInput${data}`).value;
  };

  const fetchNew = async (data) => {
    // ezt lehet még mappolni
    let name = document.querySelector(`.typeInputname`).value;
    let color = document.querySelector(`.typeInputcolor`).value;
    let description = document.querySelector(`.typeInputdescription`).value;

    if (!data && name && color && description) {
      let url = "http://localhost:8000/api/userType/newUserType";

      const fetchBody = {
        name: name,
        color: color,
        description: description,
      };

      const response = await FetchModule(url, "POST", fetchBody);
      //console.log("response is", response);
      props.close();
    } //newEnd

    if (data) {
      // ezt lehet elegánsabban,de most nem volt rá idő
      const inputValue = document.querySelector(`.typeInput${data}`).value;
      if (inputValue) {
        const response = await FetchModule(
          "http://localhost:8000/api/userType/updateUserTypes",
          "PUT",
          { key: data, value: inputValue, id: props.values[3] }
        );
        props.close();
        //console.log("response in form", response);
      }
    }
  };

  return (
    <div className="inputUserTypes">
      <div>{props.values ? "update datas" : "Write the new datas"}</div>
      {props.properties.map((data, iterator) => (
        <div className="inputMapField" key={`inputData${iterator}`}>
          <div>{data}</div>
          {data === "color" && "please write a correct color code"}
          <div>
            <input
              type="text"
              placeholder={props.values ? props.values[iterator] : "enter values"}
              className={"typeInput" + data}
            />
            {props.values && (
              <div className="inputFieldButton" onClick={() => fetchNew(data)}>
                send
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="closeButton" onClick={() => props.close()}>
        close
      </div>
      {!props.values && (
        <div className="sendNew" onClick={() => fetchNew()}>
          create
        </div>
      )}
    </div>
  );
}

export default InputTypeForm;