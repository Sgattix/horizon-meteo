import { CloudIcon, CloudRainIcon, SunIcon } from "lucide-react";
import { convertWeatherCode } from "@/app/utils";

export default function HourlyCardGrid({ data, formatHour }) {
  console.log("HourlyCardGrid data:", data);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {data.map((h, i) => (
        <div
          key={i}
          className="rounded-xl bg-white/90 p-3 flex flex-col items-center shadow border"
        >
          <div className="text-xs font-medium">{formatHour(h.time)}</div>
          <div className="text-lg font-bold">{Math.round(h.temp)}°</div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            {/* Choose icon based on weather condition */}
            {h.precipitation > 0.1 ? (
              <CloudRainIcon className="w-4 h-4" />
            ) : h.description?.toLowerCase().includes("clear") ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <CloudIcon className="w-4 h-4" />
            )}
            <span>
              {convertWeatherCode(h.weather_code) ??
                (h.precipitation > 0.1 ? "Rainy" : "Cloudy")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
