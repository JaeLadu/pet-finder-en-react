import React, { useEffect } from "react";
import { Title } from "ui/title/title";
import { Subtitle } from "ui/subtitle/subtitle";
import { Button } from "components/button/button/button";
import css from "./home.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { parsedPetsState, petsInAreaState, userLocationState } from "hooks";
import { PetCard } from "components/pet-card/petCard";
import { useNavigate } from "react-router-dom";
import { ReportForm } from "components/reportForm/reportForm";
const backendUrl = "http://localhost:3002";

function Home() {
   //modificar
   //Chequear si a la verificación de location y a que página renderizar lo puede hacer directamente el router
   const navigate = useNavigate();
   const locationExists = useRecoilValue(userLocationState).lat;
   const pets = useGetPetsInArea();
   const petsExist = pets[0]?.id;

   const parsedPets = useParsePets();
   const subtitle = petsExist
      ? "Mascotas perdidad cerca"
      : "No hay mascotas perdidas cerca del área que elegiste";

   if (locationExists) {
      return (
         <>
            <Subtitle text={subtitle} bold />
            <ReportForm />
            {petsExist
               ? parsedPets.map((pet) => {
                    return <PetCard {...pet} key={pet.id} />;
                 })
               : null}
         </>
      );
   } else {
      return (
         <div className={css.home}>
            <img
               src="https://res.cloudinary.com/dxdihjprh/image/upload/v1688831887/pet-finder/incwm1zpjwpeczovbz8x.png"
               alt="Home image"
            />
            <Title text="Pet Finder App" color="red" />
            <Subtitle text="Encontrá y reportá mascotas perdidas cerca de tu ubicación" />
            <Button
               text="Dar mi ubicación actual"
               handleClick={() => navigate("choose-location")}
            />
            <Button
               text="Cómo funciona pet finder?"
               handleClick={() => navigate("/")}
               color="green"
            />
         </div>
      );
   }
}

function useGetPetsInArea() {
   const location = useRecoilValue(userLocationState);
   const [pets, setPets] = useRecoilState(petsInAreaState);

   async function fetchPets() {
      //Recupera todas las mascotas de la base de datos cerca del area del user
      try {
         const reportsResponse = await fetch(
            `${backendUrl}/reports/location?lat=${location.lat}&lng=${location.lng}`
         );
         const data = await reportsResponse.json();
         setPets(data);
      } catch (e) {
         console.log(e);
      }
   }

   useEffect(() => {
      fetchPets();
   }, [location]);

   return pets;
}

function useParsePets() {
   const pets = useRecoilValue(petsInAreaState);
   const [parsedPets, setParsedPets] = useRecoilState(parsedPetsState);

   async function parsePets() {
      const parsedPets = await Promise.all(
         pets.map(async (p) => {
            const areaResponse = await fetch(
               //usa la API de mapbox para obtener el nombre del area usando coordenadas
               `https://api.mapbox.com/geocoding/v5/mapbox.places/${p.lng},${p.lat}.json?access_token=pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A`
            );
            const areaData = await areaResponse.json();

            return {
               id: p.id,
               name: p.name,
               img: p.imageUrl,
               location: areaData.features[2]?.place_name,
               own: false,
            };
         })
      );
      setParsedPets(parsedPets);
   }

   useEffect(() => {
      parsePets();
   }, [pets]);

   return parsedPets;
}

export { Home };
