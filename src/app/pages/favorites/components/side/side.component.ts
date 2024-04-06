import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  input,
} from '@angular/core';
import { IataService } from '../../../../services/iata.service';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [],
  templateUrl: './side.component.html',
  styleUrl: './side.component.scss',
})
export class SideComponent implements AfterViewInit {
  @Output() citySelect = new EventEmitter<string>();
  favorites: string[] = [];
  cityName: string = '';

  constructor(
    private srvc: IataService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.favorites = srvc.getFavorites();
  }

  ngAfterViewInit(): void {
    const firsLi = this.elementRef.nativeElement.querySelector('ul li');
    this.renderer.addClass(firsLi, 'is-active');
  }

  selectCity(cityName: string) {
    this.cityName = cityName;

    this.srvc.selectedCity.set(cityName);
  }

  removeCity(cityName: string) {
    this.srvc.removeFavorites(cityName);
    this.favorites = this.srvc.getFavorites();
    this.srvc.selectedCity.set(this.favorites[0]);
    const firsLi = this.elementRef.nativeElement.querySelector('ul li');
    this.renderer.addClass(firsLi, 'is-active');
  }

  onActive(id: number) {
    const list = document.querySelectorAll('li');
    list.forEach((e) => {
      if (e.value === id) {
        e.classList.add('is-active');
      } else if (e.value != id) {
        e.classList.remove('is-active');
      }
    });
  }
}
