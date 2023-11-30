import { Button } from "components/button/button/button";
import { TextInput } from "components/textInput/textInput";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./personalData.css";
import { useCheckActiveUser } from "hooks";

export function PersonalData() {
   useCheckActiveUser();
   const navigate = useNavigate();
   return (
      <div className={css.root}>
         <Title text="Datos personales" />
         <form className={css.form}>
            {/* terminar agregar placeholder con info del usuario si existe */}
            {/* terminar conectar con el backend */}
            <div className={css.inputscontainer}>
               <TextInput name="name" text="Nombre" />
               <TextInput name="location" text="Localidad" />
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
