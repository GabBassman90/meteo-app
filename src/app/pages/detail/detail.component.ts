import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IataService } from '../../services/iata.service';
import { City } from '../../interfaces/cities.interface';
import { CommonModule } from '@angular/common';
import {
  WeatherData,
  Wind,
} from '../../interfaces/api-response/current-weather.interface';
import { ActivatedRoute } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { convertToCelsius } from '../../utils/degrees-converter.util';
import { MapComponent } from './components/map/map.component';
import { WeatherIconComponent } from './components/display-condition/display-condition.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    DatepickerComponent,
    WeatherComponent,
    WeatherIconComponent,
    MapComponent,
    ForecastComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  datePickerData: string = '';
  cities: City[];
  currentCity: string = '';
  currentTemperature: number = 0;
  currentWeatherSituation: string = '';
  currentWeather: Observable<WeatherData>;
  temperatureColorClass: string = '';
  currentWind: Wind = { speed: 0, deg: 0 };
  currentCoordinates: { lat: number; lon: number } = { lat: 0, lon: 0 };
  selectedDateToForecast: string = new Date().toISOString().split('T')[0];
  forecastData: any;
  timeOfDay: number = 0;

  constructor(private service: IataService, private route: ActivatedRoute) {
    this.cities = this.service.getCitiesNames();
    this.route.params.subscribe((params) => {
      this.currentCity = params['nome'];
    });

    this.currentWeather = this.service.getWeather(this.currentCity);
    this.currentWeather.subscribe((data) => {
      this.currentWind = data.wind;
      this.currentWeatherSituation = data.weather[0].main;
      this.currentTemperature = convertToCelsius(data.main.temp);
      this.currentCoordinates = { lat: data.coord.lat, lon: data.coord.lon };
      this.setTemperatureColorClass(this.currentTemperature);
      this.currentCity = data.name;
    });
  }

  ngOnInit(): void {
    console.log(`La data corrente è: ` + this.selectedDateToForecast);

    this.service
      .getFourHourlyForecast(this.currentCity, this.selectedDateToForecast)
      .subscribe((data: any[]) => {
        this.forecastData = data;
        console.log(this.forecastData);
      });
  }

  receiveData(date: string) {
    this.selectedDateToForecast = date;
    this.datePickerData = date;
    console.log(this.selectedDateToForecast);

    this.service
      .getFourHourlyForecast(this.currentCity, this.selectedDateToForecast)
      .subscribe((data: any[]) => {
        this.forecastData = data;
        console.log(this.forecastData);
      });
  }

  setTemperatureColorClass(temperature: number): void {
    if (temperature > 30) {
      this.temperatureColorClass = 'hot';
    } else if (temperature > 20) {
      this.temperatureColorClass = 'warm';
    } else if (temperature > 10) {
      this.temperatureColorClass = 'mild';
    } else {
      this.temperatureColorClass = 'cold';
    }
  }

  getTimeOfDay(): number {
    const date = new Date();
    this.timeOfDay = date.getHours();
    return this.timeOfDay;
  }
}
