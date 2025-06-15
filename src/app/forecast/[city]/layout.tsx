"use client";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {children}
      </body>
    </>
  );
}
