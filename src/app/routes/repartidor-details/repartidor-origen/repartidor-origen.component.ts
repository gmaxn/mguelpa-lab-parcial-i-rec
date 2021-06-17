import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-repartidor-origen',
  templateUrl: './repartidor-origen.component.html',
  styleUrls: ['./repartidor-origen.component.css']
})
export class RepartidorOrigenComponent implements OnInit {

  @Input() public country: any;

  constructor() { }

  ngOnInit(): void { 
    this.country = {
      name: null,
      region: null,
      capital: null,
      alpha3Code: null,
      flag: null,
      timezones: null
    }
  }
}
