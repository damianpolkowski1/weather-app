import { Component, Inject, OnInit } from '@angular/core';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { WeatherServiceService } from '../weather-service.service';
import { TimeData, WeatherData, CityData } from '../weather-data';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from 'app/autocomplete.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [WeatherDisplayComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  weather_data: WeatherData | undefined;
  time_data: TimeData | undefined;
  display: boolean = false;
  port: number = this.document.location.port;

  constructor(
    private autocompleteService: AutocompleteService,
    private weatherService: WeatherServiceService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.autocomplete();
  }

  async autocomplete() {
    let array: CityData[] = [];

    await fetch(`http://localhost:${this.port}/`.concat('assets/city.list.json'))
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

    (await this.weatherService.getWeatherData(city_name)).subscribe(
      (weather) => {
        this.weather_data =
          this.weatherService.convertToWeatherDataObject(weather);
        this.display = true;
        this.getTime(this.weather_data.lon, this.weather_data.lat);
        this.autocomplete();
      }
    );
  }

  async getTime(lon: number, lat: number) {
    (await this.weatherService.getTimeData(lat, lon)).subscribe((time) => {
      this.time_data = this.weatherService.convertToTimeDataObject(time);
    });
  }
}
