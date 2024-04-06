import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideClock12, lucideClock3, lucideClock6, lucideClock9 } from '@ng-icons/lucide';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ lucideClock12, lucideClock3, lucideClock6, lucideClock9 })],
  template:'<ng-icon size="40px" name={{iconName}}>{{this.clock}}</ng-icon>',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {

@Input() set clockInput(clock: string){
  this.clock = clock.slice(11,13);

  switch (this.clock) {
    case "12":
      this.iconName = "lucideClock12";
      break;
    case "15":
      this.iconName = "lucideClock3";
      break;
    case "18":
      this.iconName = "lucideClock6";
      break;
    case "21":
      this.iconName = "lucideClock9";
      break;
    default:
      "no"
      break;
  }
}

clock: string = "";
iconName:string = "";


}
