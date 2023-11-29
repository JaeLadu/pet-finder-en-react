import { Button } from "components/button/button/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./password.css";
import { PasswordInput } from "components/passwordInput/passwordInput";
import { useCheckActiveUser } from "hooks";

// terminar falta conexión con backend
export function Password() {
   useCheckActiveUser();
   const navigate = useNavigate();
   return (
      <div className={css.root}>
         <Title text="Contraseña" />
         <form className={css.form}>
            <div className={css.inputscontainer}>
               <PasswordInput text="Contraseña" />
               <PasswordInput text="Confirmar contraseña" />
            </div>
            <Button
               text="Guardar"
               handleClick={() => {
                  navigate("/profile");
               }}
            />
         </form>
      </div>
   );
}
