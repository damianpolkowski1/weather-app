import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Home page',
  },
  {
    path: ':city_name',
    component: WeatherDisplayComponent,
    title: 'Weather Display',
  },
];

export default routeConfig;
