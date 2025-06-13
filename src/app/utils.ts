export const convertWeatherCode = (code: number) => {
  switch (code) {
    case 0:
      return "Clear";
    case 1:
      return "Partly Cloudy";
    case 2:
      return "Cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Freezing Fog";
    case 51:
      return "Light Drizzle";
    case 53:
      return "Moderate Drizzle";
    case 55:
      return "Heavy Drizzle";
    case 61:
      return "Light Rain";
    case 63:
      return "Moderate Rain";
    case 65:
      return "Heavy Rain";
    case 71:
      return "Light Snow";
    case 73:
      return "Moderate Snow";
    case 75:
      return "Heavy Snow";
    case 80:
      return "Light Showers";
    case 81:
      return "Moderate Showers";
    case 82:
      return "Heavy Showers";
    case 95:
      return "Thunderstorm";
    case 96:
    case 99:
      return "Thunderstorm with Hail";
    default:
      return "Unknown";
  }
};

// Prepare daily summary
export function getDailySummary(forecast: any) {
  if (!forecast?.hourly) return [];
  const { time, temperature_2m, relative_humidity_2m, precipitation } =
    forecast.hourly;
  const days: Record<string, any[]> = {};
  time.forEach((iso: string, i: number) => {
    const day = iso.split("T")[0];
    if (!days[day]) days[day] = [];
    days[day].push({
      time: iso,
      temp: temperature_2m[i],
      humidity: relative_humidity_2m[i],
      precipitation: precipitation[i],
    });
  });
  // For each day, get min/max/avg
  return Object.entries(days).map(([day, arr]: [string, any[]]) => {
    const temps = arr.map((h) => h.temp);
    const hums = arr.map((h) => h.humidity);
    const precs = arr.map((h) => h.precipitation);
    return {
      day,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      avgHumidity: Math.round(hums.reduce((a, b) => a + b, 0) / hums.length),
      totalPrecip: precs.reduce((a, b) => a + b, 0),
      hours: arr,
    };
  });
}

// Prepare hourly for today
export function getTodayHourly(forecast: any) {
  if (!forecast?.hourly) return [];
  const { time, temperature_2m, relative_humidity_2m, precipitation } =
    forecast.hourly;
  const today = new Date().toISOString().split("T")[0];
  return time
    .map((iso: string, i: number) => ({
      time: iso,
      temp: temperature_2m[i],
      humidity: relative_humidity_2m[i],
      precipitation: precipitation[i],
      weather_code: forecast.hourly.weather_code[i],
      description: convertWeatherCode(forecast.hourly.weather_code[i]),
    }))
    .filter((h: { time: string }) => h.time.startsWith(today));
}
