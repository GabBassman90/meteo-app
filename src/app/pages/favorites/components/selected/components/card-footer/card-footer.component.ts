import { Component, Input } from '@angular/core';
import { Wind } from '@projects/iatasearch/src/app/interfaces/api-response/current-weather.interface';
import { convertToCelsius } from '@projects/iatasearch/src/app/utils/degrees-converter.util';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.scss'
})
export class CardFooterComponent {
  @Input() set temperatureInput(temp: number) {
    this.currentTemperature = temp;
  }

  @Input() set windInput(wind: Wind) {
    this.currentWind = wind;
  }

  @Input() set humidityInput(humidity: number) {
    this.humidity = humidity;
  }

  @Input() set feelsLikeInput(feelsLike: number) {
    this.currentFeelsLike = feelsLike;
  }

  @Input() set pressureInput(pressure: number) {
    this.pressure = pressure;
  }

  @Input() set visibilityInput(visibility: number) {
    this.visibility = visibility;
  }

  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  currentFeelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;


  calculateWindDirection() {
    if (this.currentWind.deg > 337.5 || this.currentWind.deg < 22.5) {
      return 'N';
    } else if (this.currentWind.deg > 22.5 && this.currentWind.deg < 67.5) {
      return 'NE';
    } else if (this.currentWind.deg > 67.5 && this.currentWind.deg < 112.5) {
      return 'E';
    } else if (this.currentWind.deg > 112.5 && this.currentWind.deg < 157.5) {
      return 'SE';
    } else if (this.currentWind.deg > 157.5 && this.currentWind.deg < 202.5) {
      return 'S';
    } else if (this.currentWind.deg > 202.5 && this.currentWind.deg < 247.5) {
      return 'SW';
    } else if (this.currentWind.deg > 247.5 && this.currentWind.deg < 292.5) {
      return 'W';
    } else if (this.currentWind.deg > 292.5 && this.currentWind.deg < 337.5) {
      return 'NW';
    }

    return '';
  }



}
