import React, { useState, useEffect } from "react";
import OneDay from "./OneDay";
import "../styles/alldayz.css";

function AllDayz() {
  const [isLoading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [isSortBy, setSortby] = useState("name");

  let url = "http://localhost:8000/allDay";

  // lefetcheli a JSON-t
  const fetchData = async () => {
    const result = await fetch(url);
    const jsonData = await result.json();
    jsonData.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    let data2 = pushDifference(jsonData);
    setData(data2);
    setLoading(false);
  }; // fetchend

  useEffect(() => {
    fetchData();
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
    setData(
      isData.sort((a, b) =>
        a[isSortBy] > b[isSortBy] ? 1 : b[isSortBy] > a[isSortBy] ? -1 : 0
      )
    );
    console.log(isData);
    /*    setData(sortData); */
  }, [isSortBy]); // sorba rendezi adott elv alapján, de valamiért csak késve rendereli le.

  return (
    <div>
      <h3>Alldayz</h3>
      <div className="typeButton">
        <h4>Select sort by</h4>
        <div className="radioButtonContainer">
          <div
            className="radioButton"
            onClick={() => {
              setSortby("date");
            }}
          >
            Date
          </div>
          <div className="radioButton" onClick={() => setSortby("remaining")}>
            Remaining
          </div>
          <div className="radioButton" onClick={() => setSortby("name")}>
            Name
          </div>
        </div>
      </div>
      <div className="cardContainer">
        {isLoading ? (
          <div> Loading </div>
        ) : (
          isData.map((data, iterator) => (
            <OneDay data={data} key={"daycomp" + iterator}></OneDay>
          ))
        )}
      </div>
    </div>
  );
}

export default AllDayz;
