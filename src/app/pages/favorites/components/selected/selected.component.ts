import { CloudsComponent } from './components/clouds/clouds.component';
import { Component, Input, effect } from '@angular/core';
import { WeatherIconComponent } from '../../../detail/components/display-condition/display-condition.component';

import { CommonModule } from '@angular/common';
import { RaindropsComponent } from './components/raindrops/raindrops.component';
import { Observable } from 'rxjs';
import { SnowComponent } from './components/snow/snow.component';
import {
  WeatherData,
  Wind,
} from '../../../../interfaces/api-response/current-weather.interface';
import { IataService } from '../../../../services/iata.service';
import { SunraysComponent } from './components/sunrays/sunrays.component';

@Component({
  selector: 'app-selected',
  standalone: true,
  imports: [
    WeatherIconComponent,
    CommonModule,
    RaindropsComponent,
    SunraysComponent,
    SnowComponent,
    CloudsComponent,
  ],
  templateUrl: './selected.component.html',
  styleUrl: './selected.component.scss',
})
export class SelectedComponent {
  @Input() set weatherConditionInput(condition: string) {
    this.currentWeatherSituation = condition.toLocaleLowerCase();
    console.log(this.currentWeatherSituation);
  }

  weatherData: Observable<WeatherData> | undefined;
  selectedCity;
  currentWeatherSituation: string = '';
  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  feelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;

  constructor(private service: IataService) {
    this.selectedCity = service.selectedCity();
    this.weatherData = this.service.getWeather(this.selectedCity);
    this.weatherData.subscribe((data) => {
      this.currentWind = data.wind;
      this.currentTemperature = data.main.temp;
      this.humidity = data.main.humidity;
      this.feelsLike = data.main.feels_like;
      this.pressure = data.main.pressure;
      this.visibility = data.visibility;
      this.currentTimestamp = data.dt;
      this.currentWeatherSituation = data.weather[0].main;
    });
  }

  changeCity = effect(() => {
    this.selectedCity = this.service.selectedCity();
    this.weatherData = this.service.getWeather(this.selectedCity);
    this.weatherData.subscribe((data) => {
      this.currentWeatherSituation = data.weather[0].main;
    });
  });
}
