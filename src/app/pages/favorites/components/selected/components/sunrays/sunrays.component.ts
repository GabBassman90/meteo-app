import { Component, Input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardFooterComponent } from '../card-footer/card-footer.component';
import { SunAndMoonComponent } from '../sun-and-moon/sun-and-moon.component';
import { convertToCelsius } from '../../../../../../utils/degrees-converter.util';
import { Wind } from '../../../../../../interfaces/api-response/current-weather.interface';
import { IataService } from '../../../../../../services/iata.service';
import { SkyCloudsComponent } from '../sky-clouds/sky-clouds.component';

@Component({
  selector: 'app-sunrays',
  standalone: true,
  imports: [
    CommonModule,
    CardFooterComponent,
    SunAndMoonComponent,
    SkyCloudsComponent,
  ],
  templateUrl: './sunrays.component.html',
  styleUrl: './sunrays.component.scss',
})
export class SunraysComponent {
  @Input() set temperatureInput(temp: number) {
    this.currentTemperature = convertToCelsius(temp);
  }

  @Input() set windInput(wind: Wind) {
    this.currentWind = wind;
  }

  @Input() set humidityInput(humidity: number) {
    this.humidity = humidity;
  }

  @Input() set feelsLikeInput(feelsLike: number) {
    this.currentFeelsLike = convertToCelsius(feelsLike);
  }

  @Input() set pressureInput(pressure: number) {
    this.pressure = pressure;
  }

  @Input() set visibilityInput(visibility: number) {
    this.visibility = visibility;
  }

  @Input() set timestampInput(timestamp: number) {
    this.currentTimestamp = timestamp;
    console.log('timestamp: in sunrays', this.currentTimestamp);
  }

  updateSignal = effect(() => {
    this.service.getWeather(this.selectedCitySignal).subscribe((response) => {
      this.currentTemperature = convertToCelsius(response.main.temp);
      this.currentWind = response.wind;
      this.humidity = response.main.humidity;
      this.currentFeelsLike = convertToCelsius(response.main.feels_like);
      this.pressure = response.main.pressure;
      this.visibility = response.visibility;
      this.currentTimestamp = this.getHourOfDay(response.dt);
    });
  });

  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  currentFeelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;

  selectedCitySignal;

  getBackgroundImage() {
    const isDayTime = this.currentTimestamp > 6 && this.currentTimestamp < 19;
    return isDayTime
      ? 'linear-gradient(145deg, rgba(179,249,255,1) 0%, rgba(17,177,191,1) 100%)'
      : 'linear-gradient(145deg, rgba(94,125,166,1) 0%, rgba(12,41,77,1) 100%)';
  }
  // calculate timestap to numeric value between 1-24
  getHourOfDay(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hours = date.getUTCHours() + 1;

    return (hours % 24) + 1;
  }

  getCloudAnimationClass(): string {
    const isWestWind =
      (this.currentWind.deg > 292.5 && this.currentWind.deg <= 337.5) ||
      (this.currentWind.deg >= 0 && this.currentWind.deg < 22.5);

    return isWestWind ? 'west' : '';
  }

  constructor(private service: IataService) {
    this.selectedCitySignal = this.service.selectedCity();
  }
}
