import { Injectable, inject } from '@angular/core';
import { WeatherData, TimeData, CityData } from './weather-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  constructor(private httpService: HttpClient) {}

  private api_key = '927f05ad23939d41ce0a9ec393799dc3';

  async getWeatherData(city_name: string, city_id?: number) {
    if (parseInt(city_name)) {
      return this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${city_name}&appid=${this.api_key}&units=metric`
      );
    } else {
      return this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${this.api_key}&units=metric`
      );
    }
  }

  async getTimeData(lat: number, lon: number) {
    return this.httpService.get(
      `/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`
    );
  }

  convertToTimeDataObject(data: any) {
    const time_object: TimeData = {
      time: data.time,
      timezone_name: data.timeZone,
    };

    return time_object;
  }

  convertToWeatherDataObject(data: any) {
    const data_object: WeatherData = {
      city_name: data.name,
      country_code: data.sys.country,
      temperature: Math.round(data.main.temp).toString(),
      temp_feels_like: Math.round(data.main.feels_like).toString(),
      main_description: data.weather[0].main,
      description:
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1),
      weather_condition_icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      wind_speed: this.calculateWindSpeed(data.wind.speed) + 'km/h',
      humidity: data.main.humidity + '%',
      pressure: data.main.pressure + ' hPa',
      timezone: this.calculateTimeZone(data.timezone),
      sunrise: this.calculateTime(data.sys.sunrise, data.timezone),
      sunset: this.calculateTime(data.sys.sunset, data.timezone),
      lon: data.coord.lon,
      lat: data.coord.lat,
    };
    return data_object;
  }

  calculateWindSpeed(speed: number) {
    //speed parameter is speed in m/s
    const speed_kmh = (speed * 3.6).toFixed(2);
    return speed_kmh;
  }

  calculateTimeZone(timezone: number) {
    if (timezone < 0) {
      return 'UTC' + timezone / 3600;
    } else {
      return 'UTC+' + timezone / 3600;
    }
  }

  calculateTime(timestamp: number, timezone: number) {
    const current_time = new Date(timestamp * 1000 - 7200000 + timezone * 1000);

    const hours = current_time.getHours();
    const minutes = current_time.getMinutes().toString();

    if (parseInt(minutes) < 10) {
      var formattedTime = hours + ':0' + minutes;
      return formattedTime;
    }
    var formattedTime = hours + ':' + minutes;
    return formattedTime;
  }
}
