import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  toggleSearch = true;
  toggleTitle = false;
  constructor() {}

  onClick() {
    this.toggleSearch = !this.toggleSearch;
    this.toggleTitle = !this.toggleTitle;
  }
}
