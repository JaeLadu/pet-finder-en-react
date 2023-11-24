import React from "react";
import { Caption } from "ui/caption/caption";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBox } from "components/mapbpx/Mapbox";
import css from "./chooseLocation.css";
import { Button } from "components/button/button/button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useChangeLocationFromString, userSearchLocationState } from "hooks";
import { TextInput } from "components/textInput/textInput";

export function ChooseLocation() {
   const navigate = useNavigate();
   const setSearch = useSetRecoilState(userSearchLocationState);
   useChangeLocationFromString();
   return (
      <div className={css.container}>
         <Caption text="Buscá una dirección o punto geográfico cercano a donde estás." />
         <br />
         <br />
         <Caption text="Hacé click para soltar un pin si querés marcar la ubicación más exacta." />
         <br />
         <br />
         <Caption text="Al terminar, hacé click en Confirmar" />

         <form
            className={css.form}
            onSubmit={(e) => {
               e.preventDefault();
               const busqueda = (
                  e.currentTarget.elements.namedItem(
                     "busqueda"
                  ) as HTMLInputElement
               ).value;
               setSearch(busqueda);
               (
                  e.currentTarget.elements.namedItem(
                     "busqueda"
                  ) as HTMLInputElement
               ).value = "";
            }}
         >
            <TextInput name="busqueda" />
            <Button handleClick={() => ""} text="Buscar" />
            <div className={css.mapcontainer}>
               <MapBox />
            </div>
            <div className={css.button}></div>
         </form>
         <Button
            text="Confirmar"
            handleClick={() => navigate("/")}
            color="green"
         />
         <br />
      </div>
   );
}
