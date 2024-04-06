// map.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() set coordinatesInput(coordinates: {lat: number, lon: number}) {
    this.coordinates = coordinates;
    this.initializeMap();
  }

  coordinates: {lat: number, lon: number} = {lat: 0, lon: 0};
  private readonly API_KEY = "AIzaSyClNmY0SgZbrgrzb8ofVxt1d3E9elwCMrc";
  loader!: Loader;

   ngOnInit(): void {
    this.loader = new Loader({
      apiKey: this.API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    this.loader.load().then(() => {
          this.initializeMap();
        });
    }

    async initializeMap() {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: this.coordinates.lat, lng: this.coordinates.lon },
        zoom: 11,
      });
    }


}
