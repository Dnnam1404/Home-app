import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
  <app-housing-location 
    *ngFor="let housingLocation of filteredLocationList" 
    [housingLocation]="housingLocation">
  </app-housing-location>
  </section>
`,
  styleUrl: './home.component.css'
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((locations) => {
      this.housingLocationList = locations;
      this.filteredLocationList = this.housingLocationList;
    });
  }
}






