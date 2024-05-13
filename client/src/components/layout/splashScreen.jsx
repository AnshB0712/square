import React from 'react';
import { Loading } from "./loading"
export const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <Loading className="mt-2"/>
    </div>
  );
};
