import React from "react";
import { Header } from "components/header/header";
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
   createRoutesFromElements(<Route path="/" element={<Header />}></Route>)
);

export { router };
