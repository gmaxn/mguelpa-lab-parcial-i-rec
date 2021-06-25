import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  
  public selectedPizzas: any[] = [];

    public pizzas: any[] = [];
  
    public pizza: any;
  
  public capacidad:number = 0;

  public cantidad: number = 0;

  public total: number = 0;


  public repartidor: any;

  public country: any;

  public form: FormGroup;

  @Output() public newPizza: EventEmitter<any> = new EventEmitter<any>();

  @Output() public selectedPizza: EventEmitter<any> = new EventEmitter<any>();


    isInvalid:boolean = false;
    constructor(
      private ctryService: CountryService,
      private pizzaService: PizzaService,
      private fb:FormBuilder

  ) { this.form = this.initForm(); }

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

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      total: ['', Validators.required]
    });
  }

  onRemove(pizza:any) {

    const p = this.selectedPizzas.map(p => {
      if(p.nombre === pizza.nombre && p.cantidad > 0 && p.cantidad) {
        p.cantidad = p.cantidad-1;
        this.capacidad++;
        this.pizzas.push(pizza)
      }

      if(p.cantidad === 0) {
        this.selectedPizzas = this.selectedPizzas.filter(p => p.cantidad > 0)
        this.capacidad++;
      }
    })

    this.total = 0;
    this.selectedPizzas.map(p => {

      this.total = this.total + p.precio * p.cantidad;

    });
    this.form.patchValue({
      total: this.total
    });

  }

  onCreate() {
    this.form.get('nombre')!.markAsDirty();
    this.form.get('ingredientes')!.markAsDirty();
    this.form.get('precio')!.markAsDirty();
    this.form.get('peso')!.markAsDirty();
    if(this.form.status === 'VALID') {
      let pizza = {
        uid: '',
        nombre: this.form.get('nombre')?.value,
        ingredientes: this.form.get('ingredientes')?.value,
        precio: this.form.get('precio')?.value,
        peso: this.form.get('peso')?.value
      };
      this.newPizza.emit(pizza);
      this.form.reset();
    }
  }

  onRepartidor(repartidor:any) {
    this.repartidor = repartidor
    this.capacidad = repartidor.capacidad;

  }

  onPizza(pizza:any) {
    this.pizza = pizza;

    let p = this.selectedPizzas.find(p => p.uid === pizza.uid)
    if(p && this.capacidad - this.cantidad > 0) {
      p.cantidad = p.cantidad+1;
      this.cantidad++;
    } 
    else if(!p && this.capacidad - this.cantidad > 0) {
            this.selectedPizzas.push({
        uid: pizza.uid,
        nombre: pizza.nombre,
        precio: pizza.precio,
        cantidad: 1
      })
      this.cantidad++;
      this.pizzas = this.pizzas.filter(p => p.uid !== pizza.uid);
    }

    if(this.capacidad - this.cantidad === 0) {
      this.isInvalid = true;
      setTimeout(()=>{
        this.isInvalid = false;
      }, 3000);
    }


    this.selectedPizzas.map(p => {

      this.total = this.total + p.precio * p.cantidad;

    })


    this.form.patchValue({
      total: this.total
    });

  }
  onSelection(repartidor:any) {
    this.country = repartidor.origen;
    this.repartidor = repartidor; 
  }
}
