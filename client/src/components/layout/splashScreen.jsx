import React from 'react';
import logo from "../../assets/logo.svg";

const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <img src={logo} className="w-32 h-32 text-blue-500" />
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default SplashScreen;