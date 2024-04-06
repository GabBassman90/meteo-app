import { CommonModule, SlicePipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import {
  WeatherData,
} from '@projects/iatasearch/src/app/interfaces/api-response/current-weather.interface';
import { IataService } from '@projects/iatasearch/src/app/services/iata.service';
import { Observable } from 'rxjs';
import { WeatherIconComponent } from '../../../detail/components/display-condition/display-condition.component';
import { ThermometerComponent } from './thermometer/thermometer.component';
import { ClockComponent } from './clock/clock.component';
import { WindComponent } from './wind/wind.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapDroplet } from '@ng-icons/bootstrap-icons';
import { HumidityComponent } from './humidity/humidity.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SlicePipe, WeatherIconComponent, ThermometerComponent, ClockComponent, WindComponent, HumidityComponent,NgIconComponent],
  viewProviders: [provideIcons({ bootstrapDroplet})],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  forecastData$: Observable<WeatherData[]> | undefined;
  weatherData: Observable<WeatherData> | undefined;

  selectedCity:string;
  currentDate: string = new Date().toISOString().split('T')[0];
  forecastData: any[] = [];
  weatherSituation: string = '';

  constructor(private service: IataService) {
    this.selectedCity = this.service.selectedCity();
    this.weatherData = this.service.getWeather(this.selectedCity);
    this.weatherData.subscribe((data) => {
      this.weatherSituation = data.weather[0].main;
    });
  }

  changeCityAndHours = effect(() => {
    this.selectedCity = this.service.selectedCity();
    this.service
      .getFourHourlyForecast(this.selectedCity, this.currentDate)
      .subscribe((data: any[]) => {

        this.forecastData = data;
        this.service
          .getWeather(this.selectedCity)
          .subscribe((data) => {
            this.weatherSituation = data.weather[0].main
          }
          );
      });
  });


}
