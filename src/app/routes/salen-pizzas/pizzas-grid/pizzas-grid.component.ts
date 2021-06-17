import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizzas-grid',
  templateUrl: './pizzas-grid.component.html',
  styleUrls: ['./pizzas-grid.component.css']
})
export class PizzasGridComponent implements OnInit {

  @Input() pizzas: any[] = []

  @Output() selection: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelection(pizza: any) {

    this.selection.emit(pizza);
  }
}
