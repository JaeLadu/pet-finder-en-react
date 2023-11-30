import { Button } from "components/button/button/button";
import { PasswordInput } from "components/passwordInput/passwordInput";
import { TextInput } from "components/textInput/textInput";
import { logInDataState, newUserState, userTokenState } from "hooks";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Caption } from "ui/caption/caption";
import { Title } from "ui/title/title";
import css from "../logIn/logIn.css";

export function SignUp() {
   const navigate = useNavigate();
   const setNewUser = useSetRecoilState(newUserState);
   const setUserData = useSetRecoilState(logInDataState);
   const token = useRecoilValue(userTokenState);

   useEffect(() => {
      if (token) navigate("/profile");
   }, [token]);

   return (
      <div className={css.root}>
         <Title text="Registrate" />
         <form
            className={css.form}
            onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.target as HTMLFormElement);
               const data = {
                  mail: formData.get("mail"),
                  password: formData.get("password"),
                  passwordConfirmation: formData.get("passwordConfirmation"),
               };
               const passwordsMatch =
                  data.password == data.passwordConfirmation;
               if (passwordsMatch) {
                  setNewUser(true);
                  setUserData({
                     mail: data.mail?.toString() || "",
                     password: data.password?.toString() || "",
                  });
               } else {
                  //terminar agregar algún cartelito para esto
                  console.log("poné bien las contraseñas gil");
               }
            }}
         >
            <div className={css.inputscontainer}>
               <TextInput text="Email" name="mail" />
               <PasswordInput text="Contraseña" />
               <PasswordInput
                  text="Repetí tu contraseña"
                  name="passwordConfirmation"
               />
            </div>
            <Button handleClick={() => {}} text="Registrarme" />
         </form>
         <Caption text="Ya tenés cuenta?" />
         <Link to={"/login"}>
            <Caption text="Ingresá" />
         </Link>
      </div>
   );
}
