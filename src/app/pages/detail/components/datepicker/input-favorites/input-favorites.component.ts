import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIconComponent } from '@ng-icons/core';
import { ActivatedRoute } from '@angular/router';
import { IataService } from '../../../../../services/iata.service';

@Component({
  selector: 'app-input-favorites',
  standalone: true,
  templateUrl: './input-favorites.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, CommonModule, NgIconComponent],
  styleUrls: ['./input-favorites.component.scss'],
})
export class InputFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: IataService) {}

  cityName: string = '';
  isFavorites: boolean = true;
  notFavorites: boolean = true;
  fullFavorites: boolean = false;
  messageToFavorites: string = '';
  timeOutMessage: any;
  checkFavorites: boolean = false;
  checkFavoritesFull: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cityName = params['nome'];
      if (this.service.getFavorites().includes(this.cityName.toLowerCase())) {
        this.checkFavorites = true;
      }
      if (
        this.service.getFavorites().includes(this.cityName.toLowerCase()) &&
        this.service.getFavorites().length === 5
      ) {
        this.checkFavoritesFull = false;
        this.checkFavorites = true;
      } else if (
        !this.service.getFavorites().includes(this.cityName.toLowerCase()) &&
        this.service.getFavorites().length === 5
      ) {
        this.checkFavorites = false;
      }
    });
  }

  ngOnDestroy() {
    clearTimeout(this.timeOutMessage);
  }

  handleFavourites() {
    const arrCity = this.service.getFavorites();

    if (arrCity.length < 5 && !arrCity.includes(this.cityName.toLowerCase())) {
      this.messageToFavorites = 'Added to favorites';

      if (this.isFavorites == true) {
        this.isFavorites = false;
      }
      this.notFavorites = true;
      this.fullFavorites = false;

      this.timeOutMessage = setTimeout(() => {
        this.isFavorites = true;
        this.notFavorites = true;
        this.fullFavorites = false;
      }, 4000);

      return this.service.addToFavorites(this.cityName.toLowerCase());
    } else if (arrCity.includes(this.cityName.toLowerCase())) {
      this.messageToFavorites = 'Removed from favorites';

      if (this.notFavorites == true) {
        this.notFavorites = false;
      }
      this.isFavorites = true;
      this.fullFavorites = false;

      this.timeOutMessage = setTimeout(() => {
        this.isFavorites = true;
        this.notFavorites = true;
        this.fullFavorites = false;
      }, 4000);
      return this.service.removeFavorites(this.cityName.toLowerCase());
    } else if (arrCity.length === 5) {
      this.messageToFavorites = 'Favorite list full';
      if (this.fullFavorites == false) {
        this.fullFavorites = true;
      }
      this.isFavorites = true;
      this.notFavorites = true;
      this.checkFavoritesFull = true;

      this.timeOutMessage = setTimeout(() => {
        this.isFavorites = true;
        this.notFavorites = true;
        this.fullFavorites = false;
      }, 4000);
    }
  }
}
