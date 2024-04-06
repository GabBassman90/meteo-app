import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { IataService } from '../../../../services/iata.service';
import { InputFavoritesComponent } from './input-favorites/input-favorites.component';

@Component({
  selector: 'datepicker',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgIconComponent,
    InputFavoritesComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent implements OnInit {
  @Output() addDateToParent = new EventEmitter<any>();
  @Output() currentDateToParent = new EventEmitter<any>();

  minDate: string;
  maxDate: string;
  dateToParent: string = '';
  selectedDate: string;
  prefer: string[] = [];
  cityName: string = '';

  constructor(private route: ActivatedRoute, private service: IataService) {
    const today = new Date();
    this.minDate = this.formatDate(today);
    this.selectedDate = this.minDate;
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 4);
    this.maxDate = this.formatDate(maxDate);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cityName = params['nome'];
    });
    this.currentDateToParent.emit(this.selectedDate);
  }

  formatDate(date: Date): string {
    const yyyy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  updateDateToParent(selectedDate: string) {
    this.dateToParent = selectedDate;
    const localDate = new Date(this.dateToParent);
    console.log(localDate);

    const offset = localDate.getTimezoneOffset() * 60000; // in millisecondi
    console.log(offset);
    const correctedDate = new Date(localDate.getTime() - offset); // applica l'offset

    const formattedDate = correctedDate.toISOString().split('T')[0];
    this.addDateToParent.emit(formattedDate);
  }
}
