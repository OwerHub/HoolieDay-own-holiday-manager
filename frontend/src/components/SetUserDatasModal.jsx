import React, { useState, useEffect } from "react";
import FetchModule from "../utils/fetch";

function SetUserDatas(props) {
  const [isUserTypes, setUserTypes] = useState();
  const properties = ["name", "color", "description"];

  const renameFunction = async () => {
    const updateURL = "http://localhost:8000/api/login/updateUserData";
    const value = document.querySelector(".newNameInputField").value;
    console.log("renameValue is:", value);
    if (value) {
      const responseJson = await FetchModule(updateURL, "PUT", {
        key: "nickName",
        value: value,
      });

      console.log("Response is ", responseJson);
      localStorage.setItem("name", responseJson.newName);
    } // if vége

    props.close();
  };

  const AskAllUserTypesFetch = async () => {
    const fetchAllUrl = "http://localhost:8000/api/userType/allUserTypes";
    const response = await FetchModule(fetchAllUrl, "GET");
    console.log("fetch in UserTypes ", response);
    setUserTypes(response);
  };

  useEffect(() => {
    AskAllUserTypesFetch();
  }, []);

  return (
    <div className="setUserDatasField">
      <div className="userNameInSetField">
        <div>{props.nameFromLocalStorage()}</div>
      </div>

      <div className="newNameDiv">
        <div className="newNameHead">
          <div>please give me the new name</div>
        </div>

        <div className="newNameInput">
          <input type="text" className="newNameInputField" />
          <div className="newNameButtons">
            <div onClick={() => props.close()}> Nope</div>
            <div onClick={() => renameFunction()}>Okay</div>
          </div>
        </div>
      </div>

      <div className="userTypesDiv">
        <div>These Are your Types</div>
        <div className="userTypeContainer">
          {isUserTypes &&
            isUserTypes.map((data, iterator) => (
              <div
                className="oneType"
                key={`userType${iterator}`}
                style={{ background: data.color }}
              >
                <div>{data.name}</div>
                <div>{data.description}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="inputUserTypes">
        <div>Write the new datas</div>
        {properties.map((data, iterator) => (
          <div className="inputMapField">
            <div>{data}</div>
            <div>
              <input type="text" />
              <div className="inputFieldButton">send</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetUserDatas;
