import React from "react";
import { Link } from "react-router-dom";
import css from "./linkText.css";

function LinkText(props: {
   target: string;
   text?: string;
   onClick?: () => any;
}) {
   function handleClick() {
      props.onClick && props.onClick();
   }
   return (
      <Link to={props.target}>
         <span onClick={handleClick} className={css.link}>
            {props.text || "Link"}
         </span>
      </Link>
   );
}

export { LinkText };
