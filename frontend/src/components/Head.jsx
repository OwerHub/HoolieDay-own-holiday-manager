function HeadFunct(props) {
  return (
    <div id="head">
      <div className="userNameOrLoginPage">
        {localStorage.getItem("token") !== null ? (
          <div
            className="headName headButton"
            onClick={() => props.setPage("userDatasModal")}
          >
            <span>Hello {localStorage.getItem("name")}</span>
          </div>
        ) : (
          <div
            className="headName headButton"
            onClick={() => props.setPage("login")}
          >
            Please login or refresh the page
          </div>
        )}
        {/* <div
			className="headName headButton"
			onClick={() => props.setPage("userDatasModal")}
		>
			{nameFromLocalStorage()}
		</div> */}
      </div>

      <div
        className="NewButton headButton"
        onClick={() => props.setPage("newHolyDay")}
      >
        new Holyday
      </div>

      <div className="headButton" onClick={() => props.setPage("holydayz")}>
        HolyDayz
      </div>
    </div>
  );
}

export default HeadFunct;
