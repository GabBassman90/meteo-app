import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thermometer.component.html',
  styleUrl: './thermometer.component.scss'
})
export class ThermometerComponent {
  @Input() set tempsInput(temp: number){
    this.temp = +temp.toFixed(0);
    this.updateStyle();
  }

  temp: number = 0;
  dynamicStyle = {};
  lowTemp: boolean = false;
  mediumTemp: boolean = false;
  highTemp: boolean = false;

  updateStyle(){
    this.lowTemp = this.temp >= -10 && this.temp <= 10;
    this.mediumTemp = this.temp >= 10 && this.temp <= 25;
    this.highTemp = this.temp >= 25;
    if (this.lowTemp) {
      this.dynamicStyle = {'background': 'rgb(17,144,243)'};
    } else if (this.mediumTemp) {
      this.dynamicStyle = {'background': 'rgb(210, 129, 24)'};
    } else if (this.highTemp) {
      this.dynamicStyle = {'background': 'rgb(191,25,25)'};
    }
  }
}
