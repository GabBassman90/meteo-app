import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, RouterLink, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  toggleSearch = true;
  toggleTitle = false;

  constructor() {}

  onClick() {
    this.toggleSearch = !this.toggleSearch;
    this.toggleTitle = !this.toggleTitle;
  }
}
