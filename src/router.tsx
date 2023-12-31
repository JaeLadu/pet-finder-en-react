import React from "react";
import { Header } from "components/header/header";
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import { Home } from "pages/home/home";
import { ChooseLocation } from "pages/choose-location/chooseLocation";
import { Profile } from "pages/profile/profile";
import { PersonalData } from "pages/personal-data/personalData";
import { Password } from "pages/password/password";
import { LogIn } from "pages/logIn/logIn";
import { SignUp } from "pages/sign-up/signUp";
import { CreateReport } from "pages/report/report";
import { EditReport } from "pages/edit-report/editReport";
import { UserReports } from "pages/reports/reports";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Header />}>
         <Route index element={<Home />}></Route>
         <Route path="choose-location" element={<ChooseLocation />}></Route>
         <Route path="profile" element={<Profile />}></Route>
         <Route path="personal-data" element={<PersonalData />}></Route>
         <Route path="password" element={<Password />}></Route>
         <Route path="login" element={<LogIn />}></Route>
         <Route path="signup" element={<SignUp />}></Route>
         <Route path="createreport" element={<CreateReport />}></Route>
         <Route path="/editreport/:id?" element={<EditReport />}></Route>
         <Route path="/reports" element={<UserReports />}></Route>
      </Route>
   )
);

export { router };
