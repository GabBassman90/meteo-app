import { Component, Input } from '@angular/core';
import { WeatherIconComponent } from '../../display-condition/display-condition.component';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [WeatherIconComponent],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
  @Input() forecast: any;

  getHour(): number {
    // Extract the hour from the forecast timestamp
    return new Date(this.forecast.dt_txt).getUTCHours();
  }

  getWeatherCondition(): string {
    // Get the weather condition from the forecast data
    return this.forecast.weather[0].main.toLowerCase();
  }

}
