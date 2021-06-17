import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-new-form',
  templateUrl: './pizza-new-form.component.html',
  styleUrls: ['./pizza-new-form.component.css']
})
export class PizzaNewFormComponent implements OnInit {

  public form: FormGroup;

  @Output() public newPizza: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb:FormBuilder
  ) { this.form = this.initForm(); }

  ngOnInit(): void {
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required],
      peso: ['', Validators.required]
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
}
