import React, { useState, useEffect } from "react";
import FetchModule from "../utils/fetch";
import InputTypeForm from "./InputTypeForm";

function SetUserDatas(props) {
  const [isUserTypes, setUserTypes] = useState();
  const [isOpenInput, setOpenInput] = useState(false);
  const [isValues, setValues] = useState();
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

  const openInputField = (iterator) => {
    if (iterator) {
      const values = [
        isUserTypes[iterator].name,
        isUserTypes[iterator].color,
        isUserTypes[iterator].description,
        isUserTypes[iterator]._id,
      ];

      setValues(values);
    }

    setOpenInput(true);
  };

  //console.log("isValues", isValues);

  useEffect(() => {
    AskAllUserTypesFetch();
  }, []);

  const closeFunct = () => {
    AskAllUserTypesFetch();
    setValues();
    setOpenInput(false);
  };

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
        <div>These are Your Types</div>
        <div className="userTypeContainer">
          {isUserTypes &&
            isUserTypes.map((data, iterator) => (
              <div
                className="oneType"
                key={`userType${iterator}`}
                style={{ background: data.color }}
                onClick={() => openInputField(iterator)}
              >
                <div>{data.name}</div>
                <div>{data.description}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="newTypeDiv">
        <div onClick={() => openInputField()}>create New Type</div>
      </div>

      {isOpenInput && (
        <InputTypeForm
          properties={properties}
          values={isValues}
          close={() => closeFunct()}
        ></InputTypeForm>
      )}
    </div>
  );
}

export default SetUserDatas;
