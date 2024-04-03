import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HomepageComponent],
  template: `<main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/weather-icon.svg" alt="logo" />
    </header>
    <section class="content">
      <app-homepage></app-homepage>
    </section>
  </main>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
}
