import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixArrowUpSLine as arrow } from '@ng-icons/remixicon';
import { convertToKm } from '../../../../utils/mile-to-km.util';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgStyle, NgIconComponent],
  viewProviders: [provideIcons({ arrow })],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  @Input() set windSpeedInput(windSpeed: number) {
    this.windSpeed = convertToKm(windSpeed);
    this.updateArrowColor();
  }

  @Input() set windDirectionInput(windDirection: number) {
    this.rotationDegrees = windDirection;
    this.updateInitialRotation();
  }

  windSpeed: number = 0;
  rotationDegrees: number = 0;
  arrowColor: string = 'red';

  ngOnInit(): void {
    this.updateInitialRotation();
    this.updateArrowColor();
  }

  // Function to set the custom property when rotationDegrees changes
  updateInitialRotation(): void {
    const rotatingDiv = document.querySelector('.rotating-div') as HTMLElement;
    if (rotatingDiv) {
      rotatingDiv.style.setProperty(
        '--initial-rotation',
        this.rotationDegrees + 'deg'
      );
    }
  }

  // Function to update arrow color based on wind speed
  updateArrowColor(): void {
    if (this.windSpeed < 10) {
      this.arrowColor = '#2ecc71';
    } else if (this.windSpeed < 20) {
      this.arrowColor = 'yellow';
    } else {
      this.arrowColor = 'red';
    }
  }
}
