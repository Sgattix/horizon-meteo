import React from "react";

export default function Header() {
  return (
    <header
      className="
      flex flex-col items-center justify-centerrounded-lg w-full max-w-2xl mx-auto mt-8
    "
    >
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Welcome to the Horizon Meteo
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        Get the latest weather updates for your city.
      </p>
    </header>
  );
}
