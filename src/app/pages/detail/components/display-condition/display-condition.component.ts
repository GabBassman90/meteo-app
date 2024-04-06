import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [],
  styleUrls: ['./display-condition.component.scss'],
  templateUrl: './display-condition.component.html',
})
export class WeatherIconComponent {
  @Input() set weatherConditionInput(condition: string) {
    this.weatherCondition = condition;
    this.loadWeatherIconPath();
  }

  @Input() set timeOfDayInput(timeOfDay: number) {
    this.timeOfDay = timeOfDay;
    this.loadWeatherIconPath();
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  windowWidth: number = window.innerWidth;
  weatherCondition: string = '';
  weatherIconPath: string = '';
  timeOfDay: number = 0;

  loadWeatherIconPath(): void {
    const iconFileName = this.getWeatherIconFileName();
    this.weatherIconPath = `../../../../../assets/weather-icons/${iconFileName}.svg`;
  }

  getWeatherIconFileName(): string {
    switch (this.weatherCondition.toLowerCase()) {
      case 'thunderstorm':
        return 'thunderstorm';
      case 'drizzle':
        return 'drizzle';
      case 'rain':
        return 'rain';
      case 'snow':
        return 'snowflake';
      case 'clear':
        if (this.timeOfDay > 6 && this.timeOfDay < 18) {
          return 'clear-day';
        } else {
          return 'clear-night';
        }
      case 'clouds':
        return 'cloudy';
      case 'fog':
        return 'haze';
      case 'mist':
        return 'haze';
      default:
        return 'unknown';
    }
  }
}
