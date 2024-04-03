import { Component, inject, input, Input } from '@angular/core';
import { TimeData, WeatherData } from '../weather-data';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [],
  template: `
    <section class="basic-information">
      <h1>Weather in the chosen city:</h1>
      <img
        class="weather-condition-icon"
        src="{{ weather_data?.weather_condition_icon }}"
      />
      <h2>{{ weather_data?.description }}</h2>
      <h3 class="temp">{{ weather_data?.temperature }} °C</h3>
      <h4 class="temp_feels_like">
        Feels like: {{ weather_data?.temp_feels_like }} °C
      </h4>
      <h2 class="city-name">
        {{ weather_data?.city_name }}, {{ weather_data?.country_code }}
      </h2>
    </section>
    <section class="detail-information">
      <section class="time-information">
        <h4>
          Current time: {{ time_data?.time }} {{ weather_data?.timezone }}
        </h4>
        <h4>Timezone: {{ time_data?.timezone_name }}</h4>
        <h4>Sunrise: {{ weather_data?.sunrise }}</h4>
        <h4>Sunset: {{ weather_data?.sunset }}</h4>
      </section>

      <section class="condition-information">
        <h4>Wind speed: {{ weather_data?.wind_speed }}</h4>
        <h4>Humidity: {{ weather_data?.humidity }}</h4>
        <h4>Pressure: {{ weather_data?.pressure }}</h4>
      </section>
    </section>
  `,
  styleUrl: './weather-display.component.css',
})
export class WeatherDisplayComponent {
  @Input() weather_data!: WeatherData | undefined;
  @Input() time_data!: TimeData | undefined;

  constructor() {}
}