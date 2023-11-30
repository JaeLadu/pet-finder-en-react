import { Button } from "components/button/button/button";
import { TextInput } from "components/textInput/textInput";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./logIn.css";
import { PasswordInput } from "components/passwordInput/passwordInput";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logInDataState, targetLocationState, userTokenState } from "hooks";
import { Caption } from "ui/caption/caption";

export function LogIn() {
   const targetLocation = useRecoilValue(targetLocationState);
   const navigate = useNavigate();
   const setUserData = useSetRecoilState(logInDataState);
   const token = useRecoilValue(userTokenState);

   useEffect(() => {
      if (token) navigate(targetLocation || "/");
   }, [token]);

   return (
      <div className={css.root}>
         <Title text="Iniciar sesión" />
         <form
            onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.target as HTMLFormElement);
               const data = {
                  mail: formData.get("mail"),
                  password: formData.get("password"),
               };

               setUserData({
                  mail: data.mail?.toString() || "",
                  password: data.password?.toString() || "",
               });
            }}
            className={css.form}
         >
            <div className={css.inputscontainer}>
               <TextInput name="mail" text="Email" />
               <PasswordInput text="Contraseña" />
            </div>
            <Button text="Acceder" handleClick={() => {}} />
         </form>
         <Caption text="No tenés cuenta?" />
         <Link to={"/signup"}>
            <Caption text="Registrate" />
         </Link>
      </div>
   );
}
