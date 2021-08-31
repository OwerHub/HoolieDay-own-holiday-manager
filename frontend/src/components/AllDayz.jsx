import React, { useState, useEffect } from "react";
import OneDay from "./OneDay";
import "../styles/dist/alldayz.css";
import { dayTypesNew } from "../utils/progdatas";
import FetchModule from "../utils/fetch";
import GoogleAnswer from "./GoogleAnswer";

function AllDayz() {
  const [isLoading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [sortType, setSortType] = useState("name");
  const [isTypeArray, setTypeArray] = useState([]);

  const [isTypeCheck, setTypeCheck] = useState("11111111");

  let url = "http://localhost:8000/allDay";
  let url2 = "http://localhost:8000/api/holyday/allHolyday";

  // az isTypeCheck number-sedik elemét az ellentétére változtatja
  function nullChanger(number) {
    let typeVariable = isTypeCheck.split("");
    let actualNr = typeVariable[number];
    if (actualNr === "0") {
      actualNr = "1";
    } else {
      actualNr = "0";
    }
    typeVariable[number] = actualNr;
    console.log(!!parseInt(actualNr));
    let a = typeVariable.join("");

    setTypeCheck(a);
  }

  ///console.log(isTypeCheck);

  // lefetcheli a JSON-t
  const fetchData = async () => {
    const jsonData = await FetchModule(url2, "GET");

    //console.log("datas from fetchmodule", jsonData);

    jsonData.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    let data2 = pushDifference(jsonData);
    //console.log("data2 in Holydays", data2);
    setData(data2);
    setLoading(false);
  }; // fetchend

  const fetchTypes = async () => {
    url = "http://localhost:8000/api/type/allTypes";

    const result = await fetch(url);
    const jsonData = await result.json();
    setTypeArray(jsonData);
  };

  useEffect(() => {
    fetchData();
    fetchTypes();
  }, []); // fetch, mikor betöltődik az oldal

  function pushDifference(array) {
    let dateNow = new Date();
    for (const holyday of array) {
      let month = parseInt(holyday.date.substring(0, 2));
      let day = parseInt(holyday.date.substring(2, 4));

      let thisYear = dateNow.getFullYear();

      let dateThen = new Date(`${month}/${day}/${thisYear}`);
      let dateThenNext = new Date(`${month}/${day}/${thisYear + 1}`);

      let difference = dateThen.getTime() - dateNow.getTime();
      let differenceNext = dateThenNext.getTime() - dateNow.getTime();

      // megnézi, hogy idén-vagy jövőre leszé-e a céldátum
      if (difference < 0) {
        holyday.remaining = Math.ceil(differenceNext / (1000 * 3600 * 24));
        holyday.year = "next";
      } else {
        holyday.remaining = Math.ceil(difference / (1000 * 3600 * 24));
        holyday.year = "this";
      }
    }

    return array;
  } // pushDifference end

  useEffect(() => {
    const sortArray = (type) => {
      const sortProperty = type;

      const sorted = [...isData].sort((a, b) =>
        a[sortProperty] > b[sortProperty]
          ? 1
          : b[sortProperty] > a[sortProperty]
          ? -1
          : 0
      );

      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]); // sorba rendezi adott elv alapján, de valamiért csak késve rendereli le.

  return (
    <div>
      {/* végigiterál a dayTpypesNew tömbön, gombokat hoz létre mindegyik adatai alapján
          a gombok az a type state annyiadik elemével dolgoznak, amennyi az iterátoruk */}
      <div>Please Select the type(s)</div>
      <div className="typeButtonGroup">
        {isTypeArray &&
          isTypeArray.map((data, iterator) => (
            <div
              className="typeSelectButton"
              key={"button" + iterator}
              onClick={() => nullChanger(iterator)}
              style={{ backgroundColor: data.color }}
            >
              <div
                className="onoff"
                style={{
                  backgroundColor: !!parseInt(isTypeCheck.split("")[iterator])
                    ? "green"
                    : "red",
                }}
              ></div>
              <div className="buttonText">{data.name}</div>
            </div>
          ))}
      </div>

      <div className="typeButton">
        <h4>sort by:</h4>
        <div className="radioButtonContainer">
          <div
            className="radioButton"
            onClick={() => {
              setSortType("date");
            }}
          >
            Date
          </div>
          <div className="radioButton" onClick={() => setSortType("remaining")}>
            Remaining
          </div>
          <div className="radioButton" onClick={() => setSortType("name")}>
            Name
          </div>
        </div>
      </div>
      <div className="cardContainer">
        {isLoading && !isTypeArray ? (
          <div> Loading </div>
        ) : (
          isData.map((data, iterator) => (
            <OneDay
              refresh={() => fetchData()}
              dayTypes={isTypeArray}
              selectByte={isTypeCheck}
              data={data}
              key={"daycomp" + iterator}
            ></OneDay>
          ))
        )}
      </div>
    </div>
  );
}

export default AllDayz;
