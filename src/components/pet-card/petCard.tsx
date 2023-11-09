import React, { useEffect, useState } from "react";
import { Title } from "ui/title/title";
import { Caption } from "ui/caption/caption";
import { Button } from "components/button/button/button";
import css from "./petCard.css";

type props = {
   img: string;
   name: string;
   location: string;
   own: boolean;
};

{
   /* modificar target */
}
const editButton = <Button text="Editar" target="/" />;
const reportButton = <Button text="Reportar" color="red" target="/" />;

export function PetCard({ img, name, location, own = false }: props) {
   return (
      <div className={css.card}>
         <img className={css.img} src={img} alt={name} />
         <div className={css.infocontainer}>
            <div className={css.title}>
               <Title text={name} color="white" />
            </div>
            <div className={css.body}></div>
            <Caption text={location} color="white" />
            <div className={css.button}>{own ? editButton : reportButton}</div>
         </div>
      </div>
   );
}
