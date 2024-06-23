import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterModule],
  template: `
    <section>
      <form
        (keydown.enter)="$event.preventDefault()"
      >
        <input
          type="text"
          placeholder="Filter by City"
          #filter
          (keyup.enter)="filterResults(filter.value, filter)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value, filter)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filtredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filtredLocationList: HousingLocation[] = [];
  inputText: string = '';

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filtredLocationList = housingLocationList;
      });
  }

  filterResults(text: string, filter: HTMLInputElement) {
    if (!text) this.filtredLocationList = this.housingLocationList;

    this.filtredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase())
    );

    filter.value = '';
  }
}
