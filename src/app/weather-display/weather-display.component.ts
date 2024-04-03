import { Component, Input } from '@angular/core';
import { TimeData, WeatherData } from '../weather-data';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css',
})
export class WeatherDisplayComponent {
  @Input() weather_data!: WeatherData | undefined;
  @Input() time_data!: TimeData | undefined;

  constructor() {}
}
