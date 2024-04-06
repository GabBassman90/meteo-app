import { SunAndMoonComponent } from './../sun-and-moon/sun-and-moon.component';
import { CommonModule } from '@angular/common';
import { Component, Input, effect } from '@angular/core';
import { convertToCelsius } from '@projects/iatasearch/src/app/utils/degrees-converter.util';
import { Wind } from '@projects/iatasearch/src/app/interfaces/api-response/current-weather.interface';
import { IataService } from '@projects/iatasearch/src/app/services/iata.service';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { c } from './types';
import { SkyCloudsComponent } from '../sky-clouds/sky-clouds.component';

@Component({
  selector: 'app-clouds',
  standalone: true,
  imports: [
    SkyCloudsComponent,
    CommonModule,
    CardFooterComponent,
    SunAndMoonComponent,
  ],
  templateUrl: './clouds.component.html',
  styleUrl: './clouds.component.scss',
})
export class CloudsComponent {
  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  currentFeelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;
  cloudsAmount: number = 0;
  minCloudSize: number = 15;
  maxCloudSize: number = 40;
  clouds: any[] = new Array<c>(this.cloudsAmount);
  containerSpeed: number = 0;
  shadesOfGray: string[] = [
    'white',
    'lightgray',
    'gray',
    'darkgray',
    'dimgray',
  ];

  isWestWind: boolean = false;
  selectedCitySignal;

  updateSignal = effect(() => {
    this.service.getWeather(this.selectedCitySignal).subscribe((response) => {
      this.currentTemperature = convertToCelsius(response.main.temp);
      this.currentWind = response.wind;
      this.humidity = response.main.humidity;
      this.currentFeelsLike = convertToCelsius(response.main.feels_like);
      this.pressure = response.main.pressure;
      this.visibility = response.visibility;
      this.currentTimestamp = this.getHourOfDay(response.dt);
      this.cloudsAmount = response.clouds.all / 2 + 3;
      console.log('clouds amount: ', this.cloudsAmount);
    });
  });

  getBackgroundImage() {
    const isDayTime = this.currentTimestamp > 6 && this.currentTimestamp < 19;
    return isDayTime
      ? ' linear-gradient(145deg, rgba(229,248,250,1) 0%, rgba(33,103,110,1) 100%)'
      : 'linear-gradient(145deg, rgba(94,125,166,1) 0%, rgba(12,41,77,1) 100%)';
  }

  // calculate timestap to numeric value between 1-24
  getHourOfDay(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hours = date.getUTCHours() + 1;

    return (hours % 24) + 1;
  }

  checkIsWestWind() {
    return this.currentWind.deg > 180;
  }

  constructor(private service: IataService) {
    this.selectedCitySignal = this.service.selectedCity();
  }
}
