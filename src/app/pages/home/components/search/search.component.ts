import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IataService } from '../../../../services/iata.service';
import { City } from '../../../../interfaces/cities.interface';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CitiesFilterPipe } from '../../../../pipes/cities-filter.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NavBarComponent } from '@projects/iatasearch/src/app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CitiesFilterPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NavBarComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  myControl = new FormControl<string | City>('');
  luckyControl = new FormControl<string>('');
  cityName: string = '';
  options: City[] = [];
  filteredOptions!: Observable<City[]>;
  display = true;
  luckyBool = true;
  searchBool = false;
  noLucky = true;
  buttonMessage = 'Mi sento fortunato';

  constructor(private srvc: IataService, private router: Router) {
    this.options = srvc.getCitiesNames();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(city: City): string {
    return city && city.nome ? city.nome : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.nome.toLowerCase().startsWith(filterValue)
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const city = this.myControl.value;
    const lowercaseInput = city?.toString().toLowerCase();
    const x =
      this.options.filter((str) =>
        str.nome.toLowerCase().includes(lowercaseInput!)
      ) || null;
    if (x.length > 0) {
      const finalName =
        lowercaseInput!.charAt(0).toUpperCase() + lowercaseInput!.slice(1);
      this.router.navigate([`projects/iata-app/detail/${finalName}`]);
    } else {
      this.display = false;
      this.myControl.setValue('');
      setTimeout(() => {
        this.display = true;
      }, 5000);
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const city = event.option.value;
    console.log('Valore selezionato:', city);

    console.log(city);
    this.router.navigate([`projects/iata-app/detail/${city}`]);
  }

  async luckySearch(event: Event) {
    event.preventDefault();
    const possibleCity = this.luckyControl.value;

    const checkedCity = this.srvc.getWeather(possibleCity!).subscribe(
      (data) => {
        this.cityName = data.name;
        console.log(data.name);
        if (data.name) {
          this.router.navigate([`projects/iata-app/detail/${this.cityName}`]);
        } else {
          this.display = !this.display;
          setTimeout(() => {
            this.display = true;
          }, 5000);
        }
      },
      (error) => {
        this.display = !this.display;
        setTimeout(() => {
          this.display = true;
        }, 5000);
        console.error(error);
      }
    );
  }
  onClick() {
    this.searchBool = !this.searchBool;
    this.luckyBool = !this.luckyBool;

    if (this.buttonMessage === 'Mi sento fortunato') {
      this.buttonMessage = 'Non mi sento più fortunato';
    } else {
      this.buttonMessage = 'Mi sento fortunato';
    }
  }
}
