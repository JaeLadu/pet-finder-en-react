import {
   useCheckActiveUser,
   userSearchCoordinatesState,
   userSearchLocationState,
   userTokenState,
} from "hooks";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "ui/title/title";
import { TextInput } from "components/textInput/textInput";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";
import { Button } from "components/button/button/button";
import { MapBox } from "components/mapbpx/Mapbox";
import css from "../report/report.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002/";

export function EditReport() {
   useCheckActiveUser(); //redirects to login if no user token
   const navigate = useNavigate();
   const params = useParams();
   const [petData, setPetData] = useState(
      {} as {
         name: string;
         dataURL: string;
         imageUrl: string;
         lat: number;
         lng: number;
         id: number;
      }
   );
   const token = useRecoilValue(userTokenState);
   const [backendResponse, setBackendResponse] = useState(
      {} as { updated: boolean; message: string; error: string; owner: boolean }
   );

   const [doneFlag, setDoneFlag] = useState(false); //used to confirm the user wants to submit the form
   const [doneMessage, setDoneMessage] = useState(""); //message to show after submit, comes from backend
   const [doneMessageStyle, setDoneMessageStyle] = useState(css.donemessage);

   let inputString = ""; //necesary to prevent page from updating on every keypress and using the complete data once te user clicks search/buscar

   useEffect(() => {
      //gets the report number from params and fetches its data, then y sets a state with that data
      async function fetchReport() {
         const response = await fetch(`${backendURL}report/${params.id}`);
         const data = await response.json();
         setPetData({ ...data.report, dataURL: data.report.imageUrl }); //El back devuelve un objeto que adentro tiene otro objeto report, el cual tiene la data que necesito
         setMapboxProps({ lat: data.report.lat, lng: data.report.lng });
      }
      fetchReport();
   }, [params]);

   useEffect(() => {
      //sends de new data to de server, once de form is submited
      async function editReport() {
         try {
            const response = await fetch(`${backendURL}report/${petData.id}`, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `bearer ${token}`,
               },
               body: JSON.stringify(petData),
            });
            const data = await response.json();
            setBackendResponse(data);
         } catch (error) {
            console.log(error);
         }
      }

      if (doneFlag) {
         editReport();
         setDoneFlag(false);
      }
   }, [petData, doneFlag]);

   useEffect(() => {
      //shows or hides result from submiting. If backend responds ok, also rediects
      if (backendResponse.updated) {
         setDoneMessage(backendResponse.message);
         const finalMessageStyle = [doneMessageStyle];
         finalMessageStyle.push(css.showok);
         setDoneMessageStyle(finalMessageStyle.join(" "));
         setTimeout(() => navigate("/reports"), 1000);
      }
      if (backendResponse.error) {
         setDoneMessage(backendResponse.message);
         const finalMessageStyle = [doneMessageStyle];
         finalMessageStyle.push(css.showerror);
         setDoneMessageStyle(finalMessageStyle.join(" "));
      }
   }, [backendResponse]);

   //map neccesary hooks, searching locations and clicks moving marker
   const setSearch = useSetRecoilState(userSearchLocationState);
   const searchCoords = useRecoilValue(userSearchCoordinatesState);
   const [mapboxProps, setMapboxProps] = useState({ lat: 0, lng: 0 });
   useEffect(() => {
      if (searchCoords.lat) {
         setMapboxProps({ ...searchCoords });
      }
   }, [searchCoords]);

   return petData.name ? (
      <div className={css.root}>
         <Title text={`Editar reporte de ${petData.name}`} />
         <form
            className={css.form}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
               e.preventDefault();
               const name = (
                  e.currentTarget.elements.namedItem("name") as HTMLInputElement
               ).value;

               if (name) {
                  setPetData({ ...petData, name });
               }

               setDoneFlag(true);
            }}
         >
            <TextInput text="Nombre" name="name" placeholder={petData.name} />
            <DropzoneComp
               handleFile={(file) => {
                  setPetData({
                     ...petData,
                     dataURL: file.dataURL,
                     imageUrl: file.dataURL,
                  });
               }}
               preview={petData.imageUrl}
            />
            <TextInput
               handleInput={(input) => {
                  inputString = (input.target as HTMLInputElement).value;
               }}
               name="search"
            />
            <div className={css.button}>
               <Button
                  text="Buscar"
                  type="button"
                  handleClick={() => {
                     setSearch(inputString);
                  }}
               />
            </div>
            <MapBox
               handleClick={(e) => {
                  setPetData({ ...petData, ...e });
                  console.log(petData);
               }}
               center={mapboxProps}
            />
            <span className={...doneMessageStyle}>{doneMessage}</span>
            <div className={css.button}>
               <Button
                  color="green"
                  text={`Editar reporte de ${petData.name}`}
               />
            </div>
         </form>
      </div>
   ) : (
      <div>Cargando</div>
   );
}
