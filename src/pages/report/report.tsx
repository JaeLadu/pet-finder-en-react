import { TextInput } from "components/textInput/textInput";
import React from "react";
import { Title } from "ui/title/title";
import css from "./report.css";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";
import { Button } from "components/button/button/button";
import { useSetRecoilState } from "recoil";
import { useChangeLocationFromString, userSearchLocationState } from "hooks";
import { MapBox } from "components/mapbpx/Mapbox";

export function CreateReport() {
   let inputString = "";
   const setSearch = useSetRecoilState(userSearchLocationState);
   useChangeLocationFromString();
   return (
      <div className={css.root}>
         <Title text="Reportar mascota" />
         <form
            onSubmit={(e) => {
               e.preventDefault();
            }}
            className={css.form}
         >
            <TextInput text="Nombre" name="name" />
            <DropzoneComp />
            <TextInput
               handleInput={(input) => {
                  inputString = input.target.value;
               }}
               name="search"
            />
            <Button
               text="Buscar"
               handleClick={() => {
                  setSearch(inputString);
               }}
            />
            <MapBox />
         </form>
      </div>
   );
}
