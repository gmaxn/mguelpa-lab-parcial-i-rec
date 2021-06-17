import { Component, Input, OnInit } from '@angular/core';
import { Repartidor } from 'src/app/models/repartidor';

@Component({
  selector: 'app-repartidor-info',
  templateUrl: './repartidor-info.component.html',
  styleUrls: ['./repartidor-info.component.css']
})
export class RepartidorInfoComponent implements OnInit {

  @Input() public repartidor: any;
  

  constructor() { }

  ngOnInit(): void {
    this.repartidor = {
      dni:null,
      nombre:null,
      edad:null,
      capacidad:null,
      origen:null,
      isActive:null
    };
  }

}
