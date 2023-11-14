import React from "react";
import { Caption } from "ui/caption/caption";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBox } from "components/mapbpx/Mapbox";
import css from "./chooseLocation.css";
import { Button } from "components/button/button/button";

export function ChooseLocation() {
   return (
      <div className={css.container}>
         <Caption text="Buscá una dirección o punto geográfico cercano a donde estás." />
         <br />
         <br />
         <Caption text="Hacé click para soltar un pin y marcar la ubicación más exacta." />
         <br />
         <br />
         <Caption text="Al terminar, hacé click en Confirmar" />

         <div className={css.mapcontainer}>
            <MapBox />
         </div>

         <Button text="Confirmar" target="/" color="green" />
         <br />
      </div>
   );
}
