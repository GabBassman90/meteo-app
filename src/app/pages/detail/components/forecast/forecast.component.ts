import { Component, Input } from '@angular/core';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastCardComponent, CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  forecastData: any;

  @Input() set forecastInput(data: any) {
    this.forecastData = data;
    console.log(this.forecastData);
  };
}
