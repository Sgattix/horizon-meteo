import React from "react";
import { Button } from "./ui/button";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";

export default function CityInput({ className }: { className?: string }) {
  const [cityInput, setCityInput] = React.useState("");
  type City = { geoname_id: number; name: string; [key: string]: any };
  const [fetchedCities, setFetchedCities] = React.useState<City[]>([]);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };

  React.useEffect(() => {
    if (!cityInput || cityInput.length < 3) {
      setFetchedCities([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=*&where=name%20LIKE%20%27${cityInput}%27&limit=20`,
          { signal }
        );
        const data = await response.json();
        setFetchedCities(data.results);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return; // Ignore abort errors
          console.error("Error fetching cities:", error.message);
        }
      }
    })();

    return () => {
      controller.abort(
        "Fetch aborted due to component unmount or input change"
      );
    };
  }, [cityInput]);

  return (
    <div
      className={`w-2/3 bg-white dark:bg-gray-800 p-6 rounded-t-lg shadow-lg mt-8 ${className}`}
    >
      <p className="text-gray-800 dark:text-gray-200">
        Enter your city to get the latest weather updates:
      </p>
      <input
        type="text"
        placeholder="Search for a city..."
        className="mt-2 w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        value={cityInput}
        onChange={handleCityChange}
      />
      <Button variant="outline" className="mt-4 w-full">
        Search
      </Button>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Or select from popular cities below.
      </p>

      <ul className="mt-2 space-y-2 w-full">
        {fetchedCities.map((city) => (
          <li
            key={city.geoname_id}
            className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            title={`Click to view weather details for ${city.name}`}
          >
            <Link
              href={`/forecast/${city.name.replace(/\s+/g, "-")}`}
              className="flex items-center space-x-2"
            >
              <MapPinIcon />
              <span> {city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
