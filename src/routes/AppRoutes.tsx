import { Routes } from "react-router";
import { loginAndSignupRoutes } from "./loginAndSignupRoutes";

const AppRoutes = () => {
  return <Routes>{loginAndSignupRoutes()}</Routes>;
};

export default AppRoutes;
