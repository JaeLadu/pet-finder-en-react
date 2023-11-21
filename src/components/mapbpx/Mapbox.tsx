import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRecoilState } from "recoil";
import { userLocationState } from "hooks";

//mapbox token
const ACCESS_TOKEN =
   "pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A";

export function MapBox() {
   const Map = ReactMapboxGl({
      accessToken: ACCESS_TOKEN,
   });

   const [location, setLocation] = useState([
      -64.50775531330464, -31.42018385939361,
   ]);
   const [userLocation, setUserLocation] = useRecoilState(userLocationState);

   useEffect(() => {
      if (userLocation.lat) {
         setLocation([Number(userLocation.lat), Number(userLocation.lng)]);
      }
   }, [userLocation]);

   return (
      <Map
         onClick={(m, e) => {
            setUserLocation({ lng: e.lngLat.lat, lat: e.lngLat.lng });
         }}
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
   );
}
