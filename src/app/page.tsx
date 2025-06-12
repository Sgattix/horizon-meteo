"use client";
import { MapPinIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Header from "@/components/Header";
import CityInput from "@/components/CityInput";
import { links } from "./config";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar links={links} />
      <main className="flex flex-col items-center justify-center h-[75dvh] w-full">
        <Header />
        <CityInput />
        <div className="mt-0 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-lg">
          <p>Discover the weather for: </p>
          {/* Top cities */}
          <ul className="mt-2 space-y-2 w-full">
            <li
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              title="Click to view weather details"
            >
              <Link
                href="/forecast/new-york"
                className="flex items-center space-x-2"
              >
                <MapPinIcon />
                <span> New York</span>
              </Link>
            </li>
            <li
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              title="Click to view weather details"
            >
              <Link
                href="/forecast/london"
                className="flex items-center space-x-2"
              >
                <MapPinIcon />
                <span> London</span>
              </Link>
            </li>
            <li
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              title="Click to view weather details"
            >
              <Link
                href="/forecast/tokyo"
                className="flex items-center space-x-2"
              >
                <MapPinIcon />
                <span> Tokyo</span>
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8 absolute bottom-0 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Horizon Meteo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
