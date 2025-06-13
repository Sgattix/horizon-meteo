import React from "react";

interface CityHeaderProps {
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  elevation: number;
}

const CityHeader: React.FC<CityHeaderProps> = ({
  name,
  lat,
  lon,
  timezone,
  elevation,
}) => (
  <div>
    <h1 className="text-3xl font-semibold mb-2 text-center">
      Weather Forecast for {name}{" "}
      <span className="text-base font-normal text-gray-500">
        ({lat}, {lon})
      </span>
    </h1>
    <p className="text-center text-gray-600 mb-6">
      {timezone} | Elevation: {elevation}m
    </p>
  </div>
);

export default CityHeader;
