"use client";
import { links } from "@/app/config";
import CityInput from "@/components/CityInput";

import Navbar from "@/components/Navbar";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import ForecastMainInfo from "@/components/forecast/ForecastMainInfo";
import ForecastSidebar from "@/components/forecast/ForecastSidebar";
import ForecastDailyRow from "@/components/forecast/ForecastDailyRow";
import { getDailySummary, getTodayHourly } from "@/app/utils";

// Helper to format date/time
function formatHour(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "numeric", hour12: true });
}
function formatDay(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString([], { weekday: "short" });
}

export default function Page({ params }: { params: { city: string } }) {
  const { city } = useParams<{ city: string }>();
  const [cityInfos, setCityInfos] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [forecast, setForecast] = React.useState<any>(null);

  React.useEffect(() => {
    document.title = `${city} Weather Forecast | Horizon Meteo`;
    const controller = new AbortController();
    const { signal } = controller;
    const fetchCityData = async (city: string) => {
      try {
        setLoading(true);
        setError(null);
        setForecast(null);
        // 1. Fetch city information
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=*&where=name%20LIKE%20%27${city}%27&limit=1`,
          { signal }
        );
        const data = await response.json();
        if (data.total_count > 0) {
          const cityData = data.results[0];
          setCityInfos(cityData);
          // 2. Fetch weather forecast
          const forecastResponse = await fetch(
            `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=${cityData?.coordinates.lat}&longitude=${cityData?.coordinates.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code&models=icon_global&timezone=auto`,
            { signal }
          );
          const forecastData = await forecastResponse.json();
          console.log("Forecast Data:", forecastData);
          setForecast(forecastData);
          setError(null);
        } else {
          throw new Error("City not found");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return;

          setError(error.message);
        } else {
          setError("Error fetching city data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCityData(city);

    return () => {
      setLoading(true);
      setError(null);
      setForecast(null);
      controller.abort("Cleanup: Aborting fetch request");
      console.log("Cleanup: Aborting fetch request");
    };
  }, [city]);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar links={links} />
        <main className="min-h-[85dvh] p-4 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
          <CityInput className="bg-white/80 max-w-5xl relative z-10 !shadow-none" />
          {loading && (
            <LoaderCircleIcon className="animate-spin h-8 w-8 mx-auto mt-10 text-gray-500" />
          )}
          {error && <p className="text-red-500">{error}</p>}
          {forecast && (
            <div className="w-full max-w-5xl bg-white/80 rounded-b-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Weather Info */}
              <div className="col-span-2 flex flex-col justify-between">
                <ForecastMainInfo
                  cityInfos={cityInfos}
                  forecast={forecast}
                  now={new Date()}
                />
                <ForecastDailyRow
                  forecast={forecast}
                  getDailySummary={getDailySummary}
                  formatDay={formatDay}
                />
              </div>
              {/* Sidebar: Greeting, Time, Hourly */}
              <div className="flex flex-col items-center">
                <ForecastSidebar
                  cityInfos={cityInfos}
                  forecast={forecast}
                  getTodayHourly={getTodayHourly}
                  formatHour={formatHour}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
