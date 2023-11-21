import React from "react";
import { Caption } from "ui/caption/caption";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBox } from "components/mapbpx/Mapbox";
import css from "./chooseLocation.css";
import { Button } from "components/button/button/button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userLocationState } from "hooks";
import { TextInput } from "components/textInput/textInput";

//mapbox token
const ACCESS_TOKEN =
   "pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A";

export function ChooseLocation() {
   const navigate = useNavigate();
   const setLocation = useSetRecoilState(userLocationState);
   // // uses mapbox API to get locations coordinates from strings
   async function getLocationCoordenates(location: string) {
      const response = await fetch(
         `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
      setLocation({
         lng: data.features[0].center[1],
         lat: data.features[0].center[0],
      });
   }

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
               getLocationCoordenates(e.target.busqueda.value);
               e.target.busqueda.value = "";
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
