import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideWind } from '@ng-icons/lucide';

@Component({
  selector: 'app-wind',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({lucideWind})],
  templateUrl:'./wind.component.html',
  styleUrl: './wind.component.scss'
})
export class WindComponent {
@Input() set windDirectionInput(direction: number){
  this.windDirection = direction;
  this.rotateIconWind();
  console.log(this.windDirection);

}

@Input() set windSpeedInput(speed:number){
  this.windSpeed = speed;
  console.log(this.windSpeed);
}

windDirection: number = 0;
windSpeed:number = 0;
styleUpdate = {};

rotateIconWind() {
  if (this.windDirection > 0 && this.windDirection < 179) {
    this.styleUpdate = {
      'rotate-east': true,
      'rotate-west': false
    };
  } else if (this.windDirection >= 179 && this.windDirection <= 359) {
    this.styleUpdate = {
      'rotate-east': false,
      'rotate-west': true
    };
  }
}
}
