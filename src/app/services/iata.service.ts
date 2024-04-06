import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { City } from '../interfaces/cities.interface';
import { citiesData } from '../../assets/province-italia';
import { WeatherData } from '../interfaces/api-response/current-weather.interface';
import { FiveDays } from '../interfaces/api-response/five-days.interface';

@Injectable({
  providedIn: 'root',
})
export class IataService {
  private apiKey = '2115c3966f4c72a3e06625fe63039a04';

  constructor(private http: HttpClient) {}

  //#region iata api
  getWeather(city: string): Observable<WeatherData> {
    return this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
      )
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
  }

  getFourHourlyForecast(city: string, selectedDate: string): Observable<any[]> {
    return this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
      )
      .pipe(
        map((data) => {
          // Filter the forecast data for the selected date and specific times
          const filteredList = data.list.filter((item: any) => {
            const forecastDate = new Date(item.dt_txt + ' UTC')
              .toISOString()
              .split('T')[0];
            const forecastTime = new Date(item.dt_txt + ' UTC').getUTCHours();
            return (
              forecastDate === selectedDate &&
              [12, 15, 18, 21].includes(forecastTime)
            );
          });
          console.log(filteredList);
          return filteredList;
        })
      );
  }

  //#endregion fine iata api

  //#region cities api

  //#endregion fine cities api

  //#region search
  // this.http.get<Cities>('../../assets/province-italia.json');
  getCitiesNames(): City[] {
    return citiesData;
  }
  //#endregion fine search

  //#region handle favorites
  getFavorites(): string[] {
    const favorites = JSON.parse(localStorage.getItem('user')!);
    return favorites ? favorites : [];
  }

  addToFavorites(city: string) {
    const arrCity = this.getFavorites();
    if (arrCity.length < 5 && !arrCity.includes(city.toLowerCase())) {
      arrCity.push(city.toLowerCase());
      localStorage.setItem('user', JSON.stringify(arrCity));
      console.log(arrCity);
      this.selectedCity.set(arrCity[0]);
    }
  }

  removeFavorites(city: string) {
    const arrCity = this.getFavorites();
    if (arrCity.includes(city.toLowerCase())) {
      const indexCity = arrCity.indexOf(city);
      arrCity.splice(indexCity, 1);
      localStorage.setItem('user', JSON.stringify(arrCity));
      console.log(arrCity);
    }
  }

  //#endregion

  //#region sidebar
  firstFavorite = this.getFavorites()[0];
  selectedCity = signal(this.firstFavorite);
  //#endregion sidebar
}
