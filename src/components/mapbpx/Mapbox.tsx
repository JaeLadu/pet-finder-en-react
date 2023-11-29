import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//mapbox token
const ACCESS_TOKEN =
   "pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A";

type props = {
   center?: number[];
   handleClick: (e: any) => any;
};
export function MapBox({ center, handleClick }: props) {
   const Map = ReactMapboxGl({
      accessToken: ACCESS_TOKEN,
   });

   const [location, setLocation] = useState([
      -64.50775531330464, -31.42018385939361,
   ]);

   useEffect(() => {
      if (center && center[0]) {
         setLocation(center);
      }
   }, [center]);
   return (
      <Map
         onClick={(m, e: any) => {
            const parsedLocationObj = { lat: e.lngLat.lng, lng: e.lngLat.lat }; //For some reason de event property returns lat and lng inverted
            setLocation([parsedLocationObj.lat, parsedLocationObj.lng]);
            handleClick(parsedLocationObj);
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
