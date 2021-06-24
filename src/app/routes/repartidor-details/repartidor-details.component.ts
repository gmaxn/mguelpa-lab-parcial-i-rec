import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-repartidor-details',
  templateUrl: './repartidor-details.component.html',
  styleUrls: ['./repartidor-details.component.css']
})
export class RepartidorDetailsComponent implements OnInit {

  public repartidor: any;

  public country: any;

  constructor(
    private ctryService: CountryService
  ) { }

  ngOnInit(): void {
  }

  onSelection(repartidor:any) {
    this.country = repartidor.origen;
    this.repartidor = repartidor; 
    // this.ctryService.getCountries().subscribe(
    //   res => {
    //     this.country = res.filter(r => r.name === repartidor.origen)[0];
    //     this.repartidor = repartidor;
    //     console.log(this.country);
    //   } 
    // )
  }
}
