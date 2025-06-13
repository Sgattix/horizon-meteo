import DailySummary from "./DailySummary";

interface ForecastDailyRowProps {
  forecast: any;
  getDailySummary: (forecast: any) => any[];
  formatDay: (iso: string) => string;
}

export default function ForecastDailyRow({
  forecast,
  getDailySummary,
  formatDay,
}: ForecastDailyRowProps) {
  return (
    <div className="flex justify-between mt-8">
      <DailySummary
        data={getDailySummary(forecast)}
        formatDay={formatDay}
        cardStyle
      />
    </div>
  );
}
