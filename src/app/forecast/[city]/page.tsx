"use client";
import { links } from "@/app/config";
import Navbar from "@/components/Navbar";
import { Progress } from "@radix-ui/react-progress";
import { LoaderCircleIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { city: string } }) {
  const { city } = useParams<{ city: string }>();
  const [cityInfos, setCityInfos] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [forecast, setForecast] = React.useState<any>(null);
  React.useEffect(() => {
    // 1. Fetch city information (latitude, longitude, etc.) based on the city name
    const fetchCityData = async (city: string) => {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=*&where=name%20LIKE%20%27${city}%27&limit=1`
        );
        const data = await response.json();
        if (data.total_count > 0) {
          const cityData = data.results[0];
          console.log("City Data:", cityData);
          setCityInfos(cityData);
          // 2. Fetch weather forecast based on the city name
          const forecastResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${cityData?.coordinates.lat}&longitude=${cityData?.coordinates.lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&hourly=temperature_2m,precipitation,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,apparent_temperature&models=italia_meteo_arpae_icon_2i`
          );
          if (!forecastResponse.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const forecastData = await forecastResponse.json();
          console.log("Weather Forecast:", forecastData);
          setForecast(forecastData);
        } else {
          console.error("City not found");
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData(city);

    return () => {
      setLoading(true);
      setError(null);
      setForecast(null);
    };
  }, [city]);

  return (
    <div>
      <Navbar links={links} />
      <main className="min-h-[85dvh] p-4 flex flex-col items-center justify-center">
        {loading && (
          <LoaderCircleIcon className="animate-spin h-8 w-8 mx-auto mt-10 text-gray-500" />
        )}
        {error && <p>{error}</p>}
        {forecast && (
          <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Weather Forecast for {cityInfos?.name} (
              {cityInfos?.coordinates.lat}, {cityInfos?.coordinates.lon})
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}
