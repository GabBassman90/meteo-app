import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCloud } from '@ng-icons/heroicons/outline';
import { ionCloudSharp } from '@ng-icons/ionicons';
import { WeatherData } from '@projects/iatasearch/src/app/interfaces/api-response/current-weather.interface';
import { IataService } from '@projects/iatasearch/src/app/services/iata.service';
import { Observable } from 'rxjs';

type clouds = {
  size: number,
  posX: number,
  posY: number,
  color: string,
  velocity?: number
}

@Component({
  selector: 'app-generate-clouds',
  standalone: true,
  imports:[CommonModule, NgIconComponent],
  viewProviders: provideIcons({ heroCloud }),
  templateUrl: './generate-clouds.component.html',
  styleUrl: './generate-clouds.scss'
})
export class GenerateCloudsComponent implements OnInit {

  clouds = new Array<clouds>();
  numberClouds:number = 0;
  selectedCity: string = "";
  cloudsData: Observable<WeatherData> | undefined;

  constructor(private service: IataService) {
    this.selectedCity = this.service.selectedCity();
    this.cloudsData = this.service.getWeather(this.selectedCity);
    this.cloudsData.subscribe((data) => {
      this.numberClouds = data.clouds.all/2;
      this.generateClouds();
      console.log(this.numberClouds.toFixed())
    });
    console.log(this.clouds)

  }

  ngOnInit() {
    console.log()
  }

  changeClouds = effect(() =>{
    this.selectedCity = this.service.selectedCity();
    this.service.getWeather(this.selectedCity).subscribe((data) => (this.numberClouds = data.clouds.all/2));
    console.log("numero delle nuvole = " +this.numberClouds.toFixed())
    this.generateClouds();
    console.log("Nuvole generate: " + this.generateClouds())
  })

  generateClouds(){
    this.clouds = [];
    for(let i=0; i<this.numberClouds; i++){
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const color = '#ffffff';
      this.clouds.push({
        size: this.numberClouds,
        posX: posX,
        posY: posY,
        color: color
      });
      console.log(this.clouds)
    }
  }
}
