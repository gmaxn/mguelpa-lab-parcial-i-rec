import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-delete-form',
  templateUrl: './pizza-delete-form.component.html',
  styleUrls: ['./pizza-delete-form.component.css']
})
export class PizzaDeleteFormComponent implements OnInit {

  public form: FormGroup;

  @Output() deletion: EventEmitter<any> = new EventEmitter<any>();

  @Input() public set pizza(p: any) {
    this.form = this.fb.group({
      uid: [p?.uid, Validators.required],
      nombre: [p?.nombre, Validators.required],
      ingredientes: [p?.ingredientes, Validators.required],
      precio: [p?.precio, Validators.required],
      peso: [p?.peso, Validators.required]
    });
  }
  
  constructor(
    private fb: FormBuilder
  ) { this.form = this.initForm(); }

  ngOnInit(): void {

  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      uid: ['', Validators.required],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required],
      peso: ['', Validators.required]
    });
  }

  onDelete() {
    console.log(this.form)
    this.form.get('nombre')!.markAsDirty();
    this.form.get('ingredientes')!.markAsDirty();
    this.form.get('precio')!.markAsDirty();
    this.form.get('peso')!.markAsDirty();
    if(this.form.status === 'VALID') {
      let pizza = {
        uid: this.form.get('uid')?.value,
        nombre: this.form.get('nombre')?.value,
        ingredientes: this.form.get('ingredientes')?.value,
        precio: this.form.get('precio')?.value,
        peso: this.form.get('peso')?.value
      };
      this.deletion.emit(pizza);
    }
  }
}