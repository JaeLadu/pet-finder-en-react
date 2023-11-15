import React from "react";
import { Title } from "ui/title/title";
import { Caption } from "ui/caption/caption";
import { Button } from "components/button/button/button";
import css from "./petCard.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { reportFormState, selectedPetId } from "hooks";
import { ReportForm } from "components/reportForm/reportForm";

type props = {
   id: number;
   img: string;
   name: string;
   location: string;
   own: boolean;
};

export function PetCard({ id, img, name, location, own = false }: props) {
   const navigate = useNavigate();
   const setReportState = useSetRecoilState(reportFormState);
   const setPetId = useSetRecoilState(selectedPetId);

   const editButton = (
      // modificar pagina a la que va con id del report
      <Button text="Editar" handleClick={() => navigate("create-report")} />
   );
   const reportButton = (
      <Button
         text="Reportar"
         color="red"
         handleClick={() => {
            setPetId(id);
            setReportState(true);
         }}
      />
   );

   return (
      <div className={css.card}>
         <img className={css.img} src={img} alt={name} />
         <div className={css.infocontainer}>
            <div className={css.title}>
               <Title text={name} color="white" />
            </div>
            <div className={css.body}></div>
            <Caption text={location} color="white" />
            <div className={css.button}>{own ? editButton : reportButton}</div>
         </div>
      </div>
   );
}
