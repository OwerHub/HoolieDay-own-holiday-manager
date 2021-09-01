import React, { useState, useEffect } from "react";
//import "../styles/dist/welcomeScreen";

function WelcomeScreen(props) {
  const closeFunct = () => {
    console.log("in welcome Close");
    props.close();
  };

  return (
    <div className="WelcomeScreenOut">
      <div className="helloText">Hello User, Welcome in HoolieDays</div>
      <div>
        <p>
          Lépj be és légy üdvözölve! <br></br> Ez egy réges-régi szerelemproject,
          kissé átalakítva, hogy megfeleljen a Full Stack Api vizsga követelményeinek
        </p>
        <p>
          A program front-end része a divatos "egységesen eklektikus " stílust
          követi, amúgy számtalan kísérleti megoldásnak a gyakorlóterepe
        </p>
        <p>
          Mivel a jelenlegi vizsga a backend részre koncentrál, a frontend-nek csak
          kiszolgálószerep jut <br></br>
          <em>
            (a vizsga után, alighanem egy vagy több újonnan megtanult
            keretrendszerrel fog új FE készülni)
          </em>
        </p>
      </div>
      <div
        className="helloButton rainbowButtonOut height1rem"
        onClick={() => closeFunct()}
      >
        <span>Enter</span>
      </div>
    </div>
  );
}

export default WelcomeScreen;
