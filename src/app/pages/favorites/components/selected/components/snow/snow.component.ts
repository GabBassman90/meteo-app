import { Component, Input } from '@angular/core';
import { Wind } from '@projects/iatasearch/src/app/interfaces/api-response/current-weather.interface';
import { convertToCelsius } from '@projects/iatasearch/src/app/utils/degrees-converter.util';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { SunAndMoonComponent } from '../sun-and-moon/sun-and-moon.component';
import { SkyCloudsComponent } from '../sky-clouds/sky-clouds.component';

@Component({
  selector: 'app-snow',
  standalone: true,
  imports: [CardFooterComponent, SunAndMoonComponent, SkyCloudsComponent],
  templateUrl: './snow.component.html',
  styleUrl: './snow.component.scss',
})
export class SnowComponent {
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
    this.currentTimestamp = this.getHourOfDay(timestamp);
    console.log('timestamp: ', this.currentTimestamp);
  }

  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  currentFeelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;

  constructor() {}

  getBackgroundImage() {
    const isDayTime = this.currentTimestamp > 6 && this.currentTimestamp < 19;
    return isDayTime
      ? 'linear-gradient(145deg, rgba(119,167,230,1) 0%, rgba(41,105,187,1) 100%)'
      : 'linear-gradient(145deg, rgba(94,125,166,1) 0%, rgba(12,41,77,1) 100%)';
  }

  getHourOfDay(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hours = date.getUTCHours() + 1;

    return (hours % 24) + 1;
  }
}
