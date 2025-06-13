import { CloudIcon, DropletsIcon } from "lucide-react";
import { convertWeatherCode } from "@/app/utils";

export default function ForecastMainInfo({ cityInfos, forecast, now }) {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{cityInfos?.name}</span>
        <span className="text-sm text-gray-500">
          {now.toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-7xl font-extrabold tracking-tight">
          {forecast.hourly?.temperature_2m?.[new Date().getHours()] ?? "--"}°
        </span>
        <span className="text-2xl font-medium text-gray-600">
          {convertWeatherCode(
            forecast.hourly?.weather_code?.[new Date().getHours()]
          ) ?? "Cloudy"}
        </span>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-1 text-gray-500">
            <CloudIcon className="w-5 h-5" />
            <span className="text-sm">
              {forecast.hourly?.precipitation?.[new Date().getHours()] ?? "--"}{" "}
              mm
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <DropletsIcon className="w-5 h-5" />
            <span className="text-sm">
              {forecast.hourly?.relative_humidity_2m?.[new Date().getHours()] ??
                "--"}
              %
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
