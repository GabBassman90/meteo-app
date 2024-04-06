import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { bootstrapDroplet } from '@ng-icons/bootstrap-icons';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ bootstrapDroplet })],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.scss',
})
export class HumidityComponent {
  @Input() set humidityInput(humidity: number) {
    this.currentHumidity = humidity;
    this.currentHumidityString = String(this.currentHumidity + "%");
    this.updateStyle();



  }

  currentHumidity:number = 0;
  currentHumidityString: string = "";
  lowHumidity:boolean=false;
  mediumHumidity:boolean=false;
  highHumidity:boolean=false;
  dynamicStyle = {};


  updateStyle(){
    this.lowHumidity = this.currentHumidity >= 0 && this.currentHumidity <= 25;
    this.mediumHumidity = this.currentHumidity >= 25 && this.currentHumidity <= 50;
    this.highHumidity = this.currentHumidity >= 50 && this.currentHumidity <= 100;
    if(this.lowHumidity){
      this.dynamicStyle = {'background': 'rgb(17,144,243)'}
    } else if (this.mediumHumidity){
      this.dynamicStyle = {'background': 'rgb(210, 129, 24)'}
    } else if (this.highHumidity){
      this.dynamicStyle = {'background': 'rgb(191,25,25)'}
    }
    console.log("Umidità bassa" + this.lowHumidity)
    console.log("Umidità media" + this.mediumHumidity)
    console.log("Umidità alta" + this.highHumidity)
  }
}
