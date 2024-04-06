import {
  WeatherData,
  Wind,
} from './../../interfaces/api-response/current-weather.interface';
import { Observable } from 'rxjs';
import { IataService } from './../../services/iata.service';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { convertToCelsius } from '../../utils/degrees-converter.util';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SelectedComponent } from './components/selected/selected.component';
import { SideComponent } from './components/side/side.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    SideComponent,
    SelectedComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favoriteCities: string[] = [];
  selectedCity;
  citiesData: WeatherData[] = [];
  currentWeather: Observable<WeatherData>;
  currentWind: Wind = { speed: 0, deg: 0 };
  currentWeatherSituation: string = '';
  currentTemperature: number = 0;
  temperatureColorClass: string = '';
  currentCoordinates: { lat: number; lon: number } = { lat: 0, lon: 0 };
  temperatureColorClasses = ['cold', 'mild', 'warm', 'hot'];

  constructor(private service: IataService) {
    this.favoriteCities = service.getFavorites();
    this.selectedCity = this.service.selectedCity;
    this.currentWeather = service.getWeather(this.selectedCity());
    this.getWeatherData(this.selectedCity());
  }

  setTemperatureColorClass(temperature: number): void {
    const minArrayPos = 0;
    const maxArrayPos = this.temperatureColorClasses.length - 1;
    const temp = Math.round(temperature / 10);
    const index =
      temp < minArrayPos
        ? minArrayPos
        : temp > maxArrayPos
        ? maxArrayPos
        : temp;
    this.temperatureColorClass = this.temperatureColorClasses[index];
  }

  getWeatherData(city: string) {
    this.currentWeather = this.service.getWeather(city);
    this.currentWeather.subscribe((data) => {
      this.currentWind = data.wind;
      this.currentWeatherSituation = data.weather[0].main;
      this.currentTemperature = convertToCelsius(data.main.temp);
      this.currentCoordinates = { lat: data.coord.lat, lon: data.coord.lon };
      this.setTemperatureColorClass(this.currentTemperature);
    });
  }
}
