import React from 'react';
import logo from "../../assets/logo.svg";
import { Loading } from "./loading"
export const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <img src={logo} className="w-32 text-blue-500" />
      <Loading className="mt-2"/>
    </div>
  );
};
