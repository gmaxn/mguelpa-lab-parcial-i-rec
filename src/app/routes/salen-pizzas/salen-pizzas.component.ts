import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-salen-pizzas',
  templateUrl: './salen-pizzas.component.html',
  styleUrls: ['./salen-pizzas.component.css']
})
export class SalenPizzasComponent implements OnInit {

  public pizzas: any[] = [];

  public pizza: any;

  constructor(
    private pizzaService: PizzaService
  ) { }

  ngOnInit(): void {
    this.pizzaService.getAll().subscribe(
      res => {
        this.pizzas = res;
        if(res.length < 1) {
          this.pizza = {};
        }
        if(this.pizza) {
          this.pizza = res.filter(p => p.uid === this.pizza.uid)[0];
        }
      }
    )
  }


  onCreate(pizza:any) {

    this.pizzaService.create(pizza);

  }

  onEdition(pizza:any) {

    this.pizzaService.edit(pizza);
  }

  onDelete(pizza:any) {

    this.pizzaService.delete(pizza);
  }

  onSelection(pizza: any) {
    
    this.pizza = pizza;
  }

}
