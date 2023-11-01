import React from "react";
import { Link } from "react-router-dom";

function Logo() {
   return (
      <Link to={"/"}>
         <img
            src="https://res.cloudinary.com/dxdihjprh/image/upload/v1688484624/pet-finder/bsydcroe9uzsunuxbou0.png"
            alt="Site logo"
         />
      </Link>
   );
}

export { Logo };
