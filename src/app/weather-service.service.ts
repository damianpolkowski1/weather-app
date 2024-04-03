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
      wind_speed: data.wind.speed + 'm/s',
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

@Injectable({
  providedIn: 'root',
})
export class Autocomplete {
  autocomplete(inp: HTMLInputElement, arr: CityData[]) {
    let currentFocus: number;

    inp.addEventListener('input', function (e) {
      let a, b, i;
      const val = this.value;
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement('div');
      a.setAttribute('id', `${this.id}autocomplete-list`);
      a.setAttribute('class', 'autocomplete-items');
      this.parentNode?.appendChild(a);

      if (val.length > 1) {
        for (i = 0; i < arr.length; i++) {
          if (
            arr[i].name.substr(0, val.length).toUpperCase() ===
            val.toUpperCase()
          ) {
            b = document.createElement('div');
            b.innerHTML =
              '<strong>' + arr[i].name.substr(0, val.length) + '</strong>';
            b.innerHTML += arr[i].name.substr(val.length);
            b.innerHTML += ', ' + arr[i].state + ' ' + arr[i].country;
            b.innerHTML += "<input type='hidden' value='" + arr[i].id + "'>";
            b.addEventListener('click', function (e) {
              inp.value = this.getElementsByTagName('input')[0].value;
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      }
      return;
    });

    inp.addEventListener('keydown', function (e) {
      let x = document.getElementById(`${this.id}autocomplete-list`) as any;
      if (x) x = x.getElementsByTagName('div');
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });

    function addActive(x: HTMLCollectionOf<HTMLDivElement>) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add('autocomplete-active');
      return;
    }

    function removeActive(x: HTMLCollectionOf<HTMLDivElement>) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    }

    function closeAllLists(elmnt?: any) {
      const x = document.getElementsByClassName('autocomplete-items');
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          (x[i] as HTMLElement).parentNode?.removeChild(x[i]);
        }
      }
    }

    document.addEventListener('click', function (e) {
      closeAllLists(e.target);
    });
  }
}
