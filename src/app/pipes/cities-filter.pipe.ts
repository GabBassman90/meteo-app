import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../interfaces/cities.interface';

@Pipe({
  name: 'citiesFilter',
  standalone: true,
})
export class CitiesFilterPipe implements PipeTransform {
  transform(cities: City[], name: string | null): City[] {
    if (!cities || !name) {
      return cities;
    }
    name = name.toLocaleLowerCase();
    return cities.filter((city) => {
      return city.nome.toLocaleLowerCase().includes(name!);
    });
  }
}
