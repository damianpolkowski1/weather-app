import { Component, inject, OnInit } from '@angular/core';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { WeatherServiceService } from '../weather-service.service';
import { TimeData, WeatherData, CityData } from '../weather-data';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Autocomplete } from '../weather-service.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [WeatherDisplayComponent, CommonModule],
  template: `
    <section class="search">
      <form autocomplete="off">
        <div class="autocomplete">
          <input
            id="searchField"
            type="text"
            placeholder="Search for a city"
            (keydown.enter)="getWeather(city.value, $event)"
            #city
          />
        </div>
      </form>
      <button class="primary" type="button" (click)="getWeather(city.value)">
        Search
      </button>
    </section>
    <section class="weather-display">
      <app-weather-display
        *ngIf="display"
        [weather_data]="weather_data"
        [time_data]="time_data"
      ></app-weather-display>
    </section>
  `,
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  weather_data: WeatherData | undefined;
  time_data: TimeData | undefined;
  service = inject(WeatherServiceService);
  route: ActivatedRoute = inject(ActivatedRoute);
  display: boolean = false;

  constructor(private autocompleteService: Autocomplete) {}

  ngOnInit() {
    this.autocomplete();
  }

  async autocomplete() {
    let array: CityData[] = [];

    await fetch('../assets/city.list.json')
      .then((response) => response.json())
      .then((json) => {
        array = json;
      });

    var htmlElement = document.getElementById(
      'searchField'
    ) as HTMLInputElement;

    if (htmlElement) this.autocompleteService.autocomplete(htmlElement, array);
  }

  async getWeather(city_name: string, event?: any) {
    if (event) event.preventDefault();

    (await this.service.getWeatherData(city_name)).subscribe((weather) => {
      this.weather_data = this.service.convertToWeatherDataObject(weather);
      this.display = true;
      this.getTime(this.weather_data.lon, this.weather_data.lat);
      this.autocomplete();
    });
  }

  async getTime(lon: number, lat: number) {
    (await this.service.getTimeData(lat, lon)).subscribe((time) => {
      this.time_data = this.service.convertToTimeDataObject(time);
    });
  }
}
