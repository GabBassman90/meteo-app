import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'iata-app',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'IATAsearch';
}
