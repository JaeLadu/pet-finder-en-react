import React, { useEffect, useState } from "react";
import { Title } from "ui/title/title";
import { Subtitle } from "ui/subtitle/subtitle";
import { Button } from "components/button/button/button";
import css from "./home.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { petsInAreaState, userLocationState } from "hooks";
const backendUrl = "http://localhost:3002";

function Home() {
   //modificar
   //Chequear si a la verificación de location y a que página renderizar lo puede hacer directamente el router
   const location = useRecoilValue(userLocationState);
   const pets = useGetPetsInArea();
   const subtitle = pets[0]?.id
      ? "Mascotas perdidad cerca"
      : "No hay mascotas perdidas cerca del área que elegiste";

   if (location.lat) {
      return (
         <>
            <Subtitle text={subtitle} bold />
            {pets.map((pet) => {
               return (
                  <div key={pet.id}>
                     <img src={pet.imageUrl} alt={pet.name} />
                     <span>{pet.name}</span>
                     <span>{pet.area}</span>
                  </div>
               );
            })}
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
            <div className={css.titlecontainer}>
               <Subtitle text="Encontrá y reportá mascotas perdidas cerca de tu ubicación" />
            </div>
            <Button text="Dar mi ubicación actual" target="/" />
            <Button text="Cómo funciona pet finder?" target="/" color="green" />
         </div>
      );
   }
}

function useGetPetsInArea() {
   const location = useRecoilValue(userLocationState);
   const [pets, setPets] = useRecoilState(petsInAreaState);

   async function fetchPets() {
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

export { Home };
