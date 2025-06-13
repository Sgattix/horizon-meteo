import React from "react";

interface DailyData {
  day: string;
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  totalPrecip: number;
}

interface DailySummaryProps {
  data: DailyData[];
  formatDay: (iso: string) => string;
}

const DailySummary: React.FC<DailySummaryProps> = ({ data, formatDay }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {data.map((d) => (
      <div
        key={d.day}
        className="rounded-lg bg-blue-50 p-4 flex flex-col items-center shadow"
      >
        <div className="text-lg font-semibold">{formatDay(d.day)}</div>
        <div className="text-2xl font-bold mt-2">
          {d.minTemp.toFixed(1)}° / {d.maxTemp.toFixed(1)}°
        </div>
        <div className="text-gray-600 mt-1">Humidity: {d.avgHumidity}%</div>
        <div className="text-blue-700 mt-1">
          Precip: {d.totalPrecip > 0 ? d.totalPrecip.toFixed(1) + " mm" : "-"}
        </div>
      </div>
    ))}
  </div>
);

export default DailySummary;
