import React from "react";
import { Title } from "ui/title/title";
import { Subtitle } from "ui/subtitle/subtitle";
import { Button } from "components/button/button/button";
import css from "./home.css";
import { useRecoilValue } from "recoil";
import { petsInAreaState, userLocationState } from "hooks";
import { PetCard } from "components/pet-card/petCard";
import { useNavigate } from "react-router-dom";
import { ReportForm } from "components/reportForm/reportForm";

function Home() {
   const navigate = useNavigate();
   const locationExists = useRecoilValue(userLocationState).lat;
   const pets = useRecoilValue(petsInAreaState);
   const petsExist = pets[0]?.id;

   const subtitle = petsExist
      ? "Mascotas perdidad cerca"
      : "No hay mascotas perdidas cerca del área que elegiste";

   if (locationExists) {
      return (
         <>
            <Subtitle text={subtitle} bold />
            <ReportForm />
            {petsExist
               ? pets.map((pet) => {
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

export { Home };
