import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.css']
})
export class CountryGridComponent implements OnInit {

  public countries: Country[] = [];

  public filtered: Country[] = [];

  private _filterTerm: string = '';

  public africa: boolean = false;

  public europe: boolean = false;

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    console.log(value)
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.countries;
  }

  performFilter(filterBy: string): any {

    filterBy = filterBy.toLocaleLowerCase();

    return this.countries.filter(c => 
      c.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      c.region.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }


  @Output() public selection: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(
    private ctry: CountryService
  ) { }

  ngOnInit(): void {
    this.ctry.getCountries().subscribe(res => {
      this.countries = res;
      this.filtered = res;
    });
  }

  onSelection(country: Country) {
    this.selection.emit(country);
  }

  filterByContinent() {
    if(!this.africa && !this.europe) {
     this.ctry.getCountries().subscribe(res => {
        this.countries = res;
        this.filtered = res;
      });
    }
    if(!this.africa && this.europe) {
      this.ctry.getCountries().subscribe(res => {
        this.countries = res.filter(r => r.region === 'Europe');
        this.filtered = this.countries;
      });
    }
    if(this.africa && !this.europe) {
      this.ctry.getCountries().subscribe(res => {
        this.countries = res.filter(r => r.region === 'Africa');
        this.filtered = this.countries;
      });
    }
    if(this.africa && this.europe) {
      this.ctry.getCountries().subscribe(res => {
        this.countries = res.filter(r => r.region === 'Africa' || r.region === 'Europe');
        this.filtered = this.countries;
      });
    }
  }

  onAfrica() {
    
  }
}
