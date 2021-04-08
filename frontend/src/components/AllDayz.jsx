import React, { useState, useEffect } from "react";
import OneDay from "./OneDay";

function AllDayz() {
  const [isLoading, setLoading] = useState(true);
  const [isData, setData] = useState([]);

  let url = "http://localhost:8000/allDay";

  const fetchData = async () => {
    const result = await fetch(url);
    const jsonData = await result.json();
    jsonData.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    setData(jsonData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  /* 
  let objs = isData;
  objs.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
  console.log(objs);
 */
  return (
    <div>
      <h3>Alldayz</h3>
      {isLoading ? (
        <div> Loading </div>
      ) : (
        isData.map((data, iterator) => (
          <OneDay data={data} key={"daycomp" + iterator}></OneDay>
        ))
      )}
    </div>
  );
}

export default AllDayz;
