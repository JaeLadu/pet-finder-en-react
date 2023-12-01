import { Button } from "components/button/button/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./password.css";
import { PasswordInput } from "components/passwordInput/passwordInput";
import { useCheckActiveUser, userTokenState } from "hooks";
import { Caption } from "ui/caption/caption";
import { useRecoilValue } from "recoil";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002/";

export function Password() {
   useCheckActiveUser();
   const navigate = useNavigate();
   const token = useRecoilValue(userTokenState);
   let currentPass;
   let newPass;
   let checkPass;
   const [inputsClass, setInputsClass] = useState(css.inputscontainer);
   const [errorMessage, setErrorMessage] = useState("");
   const [messageClass, setMessageClass] = useState(css.message);
   const [doneFlag, setDoneFlag] = useState(false);
   const [reqObject, setReqObject] = useState(
      {} as { password: string; newPassword: string; passwordCheck: string }
   );
   const [responseObject, setResponseObject] = useState(
      {} as { passwordCheck: boolean; error: string; message: string }
   );

   useEffect(() => {
      async function updatePass() {
         const response = await fetch(`${backendURL}auth`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
               password: reqObject.password,
               newPassword: reqObject.newPassword,
            }),
         });
         const data = await response.json();
         setResponseObject(data);
      }
      if (doneFlag) {
         updatePass();
         setDoneFlag(false);
      }
   }, [doneFlag]);

   useEffect(() => {
      if (reqObject.newPassword != reqObject.passwordCheck) {
         setInputsClass(`${css.inputscontainer} ${css.inputserror}`);
         setErrorMessage("Las contraseñas no coinciden");
         setMessageClass(css.messageerror);
      } else {
         setDoneFlag(true);
         setInputsClass(css.inputscontainer);
         setMessageClass(css.message);
      }
   }, [reqObject]);

   useEffect(() => {
      if (responseObject.passwordCheck) {
         setErrorMessage("Contraseña actualizada");
         setMessageClass(css.messageok);
         setTimeout(() => {
            navigate("/profile");
         }, 1000);
      }
   }, [responseObject]);

   return (
      <div className={css.root}>
         <Title text="Cambiar contraseña" />
         <form
            onSubmit={(e) => {
               e.preventDefault();
               console.log("submit");
               setReqObject({
                  ...reqObject,
                  password: currentPass,
                  newPassword: newPass,
                  passwordCheck: checkPass,
               });
            }}
            className={css.form}
         >
            <div className={inputsClass}>
               <PasswordInput
                  handleInput={(input) => {
                     currentPass = (input.target as HTMLInputElement).value;
                  }}
                  text="Contraseña actual"
               />
               <PasswordInput
                  handleInput={(input) => {
                     newPass = (input.target as HTMLInputElement).value;
                  }}
                  text="Nueva contraseña"
               />
               <PasswordInput
                  handleInput={(input) => {
                     checkPass = (input.target as HTMLInputElement).value;
                  }}
                  text="Confirmar nueva contraseña"
               />
            </div>
            <span className={messageClass}>
               <Caption text={errorMessage} />
            </span>
            <Button text="Guardar" handleClick={() => {}} />
         </form>
      </div>
   );
}
