import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, AddUserPage, UserDetailsPage } from "../pages";
import { Path } from "./index";

export const RoutesComponent: FC = () => {
  console.log("Routes component");
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Home} element={<MainPage />} />
        <Route path={Path.AddUser} element={<AddUserPage />} />
        <Route path={`${Path.User}/:userId`} element={<UserDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
