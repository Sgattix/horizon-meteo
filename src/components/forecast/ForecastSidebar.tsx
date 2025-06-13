import { DropletsIcon, CloudIcon } from "lucide-react";
import HourlyCardGrid from "./HourlyCardGrid";

interface ForecastSidebarProps {
  cityInfos: any;
  forecast: any;
  getTodayHourly: (forecast: any) => any[];
  formatHour: (iso: string) => string;
}

export default function ForecastSidebar({
  cityInfos,
  forecast,
  getTodayHourly,
  formatHour,
}: ForecastSidebarProps) {
  const now = new Date();
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <div className="text-xl font-semibold">
          Good{" "}
          {now.getHours() < 12
            ? "Morning"
            : now.getHours() < 18
            ? "Afternoon"
            : "Evening"}
        </div>
        <div className="text-3xl font-bold">
          {now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: cityInfos?.timezone ?? "UTC",
          })}
        </div>
        <div className="text-gray-600"></div>
      </div>
      <div className="w-full">
        <div className="font-medium mb-2">Hourly Forecast</div>
        <HourlyCardGrid
          data={getTodayHourly(forecast)}
          formatHour={formatHour}
        />
      </div>
    </div>
  );
}
