import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sun-and-moon',
  standalone: true,
  imports: [],
  templateUrl: './sun-and-moon.component.html',
  styleUrl: './sun-and-moon.component.scss'
})
export class SunAndMoonComponent {


  @Input() set timestampInput(timestamp: number) {
    this.currentTimestamp = timestamp;
    console.log('timestamp: in sun and moon', this.currentTimestamp);
  }

  currentTimestamp: number = 0;

   // calculate timestap to numeric value between 1-24
   getHourOfDay(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hours = date.getUTCHours() + 1;

    return (hours % 24) + 1;
  }
}
