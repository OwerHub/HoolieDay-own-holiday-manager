const FetchModule = async (url, method, body) => {
  const fetchHeaders = {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("token"),
  };

  const result = await fetch(url, {
    method: method,
    mode: "cors",
    headers: fetchHeaders,
    body: JSON.stringify(body),
  });

  const jsonData = await result.json();

  return jsonData;
};

export default FetchModule;
