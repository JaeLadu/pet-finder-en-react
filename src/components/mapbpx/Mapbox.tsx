import React, { FormEvent, useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import css from "./Mapbox.css";
import { TextInput } from "components/textInput/textInput";
import { useSetRecoilState } from "recoil";
import { userLocationState } from "hooks";
import { Button } from "components/button/button/button";

//mapbox token
const ACCESS_TOKEN =
   "pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A";

export function MapBox() {
   //initial location in Villa Carlos Paz
   const [location, setLocation] = useState([
      -64.50775531330464, -31.42018385939361,
   ]);
   const setGlobalLocation = useSetRecoilState(userLocationState);

   const Map = ReactMapboxGl({
      accessToken: ACCESS_TOKEN,
   });

   //uses mapbox API to get locations coordinates from strings
   async function getLocationCoordenates(location: string) {
      const response = await fetch(
         `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
      setLocation(data.features[0].center);
   }

   useEffect(() => {
      setGlobalLocation({
         lat: JSON.stringify(location[1]),
         lng: JSON.stringify(location[0]),
      });
   }, [location]);

   return (
      <>
         <form
            className={css.form}
            onSubmit={(e) => {
               e.preventDefault();
               getLocationCoordenates(e.target.busqueda.value);
               e.target.busqueda.value = "";
            }}
         >
            <TextInput name="busqueda" />
            <div className={css.button}>
               <Button handleClick={() => ""} text="Buscar" />
            </div>
         </form>
         <Map
            onClick={(m, e) => setLocation([e.lngLat.lng, e.lngLat.lat])}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
               height: "calc(100vh - 250px)",
               width: "100%",
            }}
            center={[location[0], location[1]]}
         >
            <Marker coordinates={location} anchor="bottom">
               <span className="material-symbols-outlined">location_on</span>
            </Marker>
         </Map>
      </>
   );
}
