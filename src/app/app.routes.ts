import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchComponent } from './pages/home/components/search/search.component';
import { AppComponent } from './app.component';

export const IATARoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'detail/:nome', component: DetailComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
