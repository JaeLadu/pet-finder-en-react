import React from "react";
import { Title } from "ui/title/title";
import { Subtitle } from "ui/subtitle/subtitle";
import { Button } from "components/button/button/button";
import css from "./home.css";

function Home() {
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
export { Home };
