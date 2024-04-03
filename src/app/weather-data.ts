export interface WeatherData {
  city_name: string;
  country_code: string;
  temperature: string;
  temp_feels_like: string;
  main_description: string;
  description: string;
  weather_condition_icon: string;
  wind_speed: string;
  humidity: string;
  pressure: string;
  timezone: string;
  sunrise: string;
  sunset: string;
  lon: number;
  lat: number;
}

export interface TimeData {
  time: string;
  timezone_name: string;
}

export interface CityData {
  id: number;
  name: string;
  state: string;
  country: string;
}
