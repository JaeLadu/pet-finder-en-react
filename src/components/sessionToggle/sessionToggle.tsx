import { userEmailState, userTokenState } from "hooks";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LinkText } from "ui/linkText/linkText";
import { Caption } from "ui/caption/caption";
import css from "./sessionToggle.css";

function SessionToggle() {
   const userEmail = useRecoilValue(userEmailState);
   const setEmail = useSetRecoilState(userEmailState);
   const setToken = useSetRecoilState(userTokenState);

   function closeSession() {
      setEmail("");
      setToken("");
   }

   //eliminar
   function logIn() {
      setEmail("Jae");
      setToken("jae");
   }

   if (userEmail) {
      return (
         <div className={css.root}>
            <Caption text={userEmail} />
            <LinkText onClick={closeSession} target="/" text="Cerrar sesión" />
         </div>
      );
   } else {
      return (
         <LinkText
            onClick={logIn}
            target="login"
            text="Iniciar sesión"
         ></LinkText>
      );
   }
}

export { SessionToggle };
