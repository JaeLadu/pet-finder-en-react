import { Button } from "components/button/button/button";
import { PasswordInput } from "components/passwordInput/passwordInput";
import { TextInput } from "components/textInput/textInput";
import { logInDataState, newUserState, userTokenState } from "hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Title } from "ui/title/title";

export function SignUp() {
   const navigate = useNavigate();
   const setNewUser = useSetRecoilState(newUserState);
   const setUserData = useSetRecoilState(logInDataState);
   const token = useRecoilValue(userTokenState);

   useEffect(() => {
      if (token) navigate("/profile");
   }, [token]);

   return (
      <div>
         <Title text="Registrate" />
         <form
            onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.target as HTMLFormElement);
               const data = {
                  mail: formData.get("mail"),
                  password: formData.get("password"),
                  passwordConfirmation: formData.get("passwordConfirmation"),
               };
               const passwordsMatch =
                  data.password == data.passwordConfirmation;
               if (passwordsMatch) {
                  setNewUser(true);
                  setUserData({
                     mail: data.mail?.toString() || "",
                     password: data.password?.toString() || "",
                  });
               } else {
                  //terminar agregar algún cartelito para esto
                  console.log("poné bien las contraseñas gil");
               }
            }}
         >
            <TextInput text="Email" name="mail" />
            <PasswordInput text="Contraseña" />
            <PasswordInput
               text="Repetí tu contraseña"
               name="passwordConfirmation"
            />
            <Button handleClick={() => {}} text="Registrarme" />
         </form>
      </div>
   );
}
