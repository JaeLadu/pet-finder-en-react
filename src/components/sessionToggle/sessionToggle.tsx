import { headerMenuState, logInDataState } from "hooks";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LinkText } from "ui/linkText/linkText";
import { Caption } from "ui/caption/caption";
import css from "./sessionToggle.css";

function SessionToggle() {
   const [userData, setUserData] = useRecoilState(logInDataState);
   const setMenuState = useSetRecoilState(headerMenuState);

   if (userData.mail) {
      return (
         <div className={css.root}>
            <Caption text={userData.mail} />
            <LinkText
               onClick={() => setUserData({ mail: "", password: "" })}
               target="/"
               text="Cerrar sesión"
            />
         </div>
      );
   } else {
      return (
         <LinkText
            onClick={() => setMenuState(false)}
            target="/login"
            text="Iniciar sesión"
         />
      );
   }
}

export { SessionToggle };
