import { Button } from "components/button/button/button";
import { PetCard } from "components/pet-card/petCard";
import { useCheckActiveUser, userPetsState } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Caption } from "ui/caption/caption";
import { Title } from "ui/title/title";

export function UserReports() {
   useCheckActiveUser();
   const navigate = useNavigate();
   const pets = useRecoilValue(userPetsState);
   const petsExist = pets[0]?.id;

   return (
      <>
         <Title text="Mis mascotas perdidas" />
         {petsExist ? (
            pets.map((pet) => {
               //    pet.own = true;
               return <PetCard {...pet} own={true} key={pet.id} />;
            })
         ) : (
            <>
               <Caption text="Aún no reportaste mascotas perdidas" />
               <Button
                  text="Publicar reporte"
                  color="green"
                  handleClick={() => navigate("/createreport")}
               />
            </>
         )}
      </>
   );
}
