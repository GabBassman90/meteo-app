import { Component, Input, effect } from '@angular/core';
import { c } from '../clouds/types';
import { CommonModule } from '@angular/common';
import { bootstrapCloudFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Wind } from '../../../../../../interfaces/api-response/current-weather.interface';
import { IataService } from '../../../../../../services/iata.service';

@Component({
  selector: 'app-sky-clouds',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapCloudFill })],
  templateUrl: './sky-clouds.component.html',
  styleUrl: './sky-clouds.component.scss',
})
export class SkyCloudsComponent {
  currentTemperature: number = 0;
  currentWind: Wind = { speed: 0, deg: 0 };
  humidity: number = 0;
  currentFeelsLike: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  currentTimestamp: number = 0;

  amounts: number = 0;
  minCloudSize: number = 15;
  maxCloudSize: number = 40;
  clouds: any[] = new Array<c>();
  containerSpeed: number = 0;
  shadesOfGray: string[] = ['white', 'lightgray', 'gray', 'darkgray'];

  isWestWind: boolean = false;
  selectedCitySignal;
  constructor(private service: IataService) {
    this.selectedCitySignal = service.selectedCity();
  }

  updateSignal = effect(() => {
    this.service.getWeather(this.selectedCitySignal).subscribe((response) => {
      this.currentWind = response.wind;
      this.amounts = response.clouds.all / 2 + 3;
      this.isWestWind = this.checkIsWestWind();
      this.generateClouds();
    });
  });
  ngOnInit() {
    // Start the animation loop when the component initializes
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    // Use requestAnimationFrame for smoother animation
    const update = () => {
      this.updateCloudPositions();
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  updateCloudPositions() {
    // Update the position of each cloud based on its scaled speed
    this.clouds.forEach((cloud) => {
      const speedFactor = 2 / cloud.size; // Divide by the cloud size to make smaller clouds move faster

      // Update left or right based on wind direction
      if (this.isWestWind) {
        cloud.left -= cloud.speed * speedFactor; // Use -= for west wind
      } else {
        cloud.left += cloud.speed * speedFactor; // Use += for east wind
      }

      // If the cloud is outside the view, reset its position
      if (
        (this.isWestWind && cloud.left < -cloud.size) ||
        (!this.isWestWind && cloud.left > 100 + cloud.size)
      ) {
        this.resetCloud(cloud);
      }
    });
  }

  generateClouds() {
    for (let i = 0; i < this.amounts; i++) {
      this.clouds.push(this.generateRandomCloud());
    }
    console.log('clouds: ', this.clouds);
  }

  generateRandomCloud(): c {
    const isWestWind = this.isWestWind;

    return {
      size:
        (Math.floor(
          Math.random() * (this.maxCloudSize - this.minCloudSize + 1)
        ) +
          this.minCloudSize) *
        5,
      top: Math.floor(Math.random() * 50) + 1,
      left: isWestWind
        ? 100 + Math.floor(Math.random() * 100)
        : -Math.floor(Math.random() * 100),
      right: isWestWind
        ? -Math.floor(Math.random() * 100)
        : 100 + Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 100) + 1,
      height: Math.floor(Math.random() * 100) + 1,
      color:
        this.shadesOfGray[Math.floor(Math.random() * this.shadesOfGray.length)],
      speed: Math.floor(Math.random() * 10) + 1,
      animationDuration: Math.floor(Math.random() * 10) + 1,
    };
  }

  resetCloud(cloud: c) {
    const isWestWind = this.isWestWind;

    cloud.left = isWestWind
      ? 100 + Math.floor(Math.random() * 100)
      : -Math.floor(Math.random() * 100);
    cloud.top = Math.floor(Math.random() * 50) + 1;
  }
  checkIsWestWind() {
    return this.currentWind.deg > 180;
  }
}
