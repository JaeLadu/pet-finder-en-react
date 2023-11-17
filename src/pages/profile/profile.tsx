import { Button } from "components/button/button/button";
import { SessionToggle } from "components/sessionToggle/sessionToggle";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./profile.css";

export function Profile() {
   const navigate = useNavigate();
   return (
      <div className={css.root}>
         <Title text="Mis datos" />
         <div className={css.buttonscontainer}>
            <Button
               handleClick={() => navigate("/personal-data")}
               text="Modificar datos personales"
            />
            <Button
               handleClick={() => navigate("/password")}
               text="Modificar contraseña"
            />
         </div>
         <SessionToggle />
      </div>
   );
}
