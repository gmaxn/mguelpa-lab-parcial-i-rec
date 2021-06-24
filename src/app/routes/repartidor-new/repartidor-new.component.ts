import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { RepartidorService } from 'src/app/services/repartidor.service';

@Component({
  selector: 'app-repartidor-new',
  templateUrl: './repartidor-new.component.html',
  styleUrls: ['./repartidor-new.component.css']
})
export class RepartidorNewComponent implements OnInit {

  public form: FormGroup;

  public states: any = {};

  public selectedCountry?: Country;

  constructor(
    private fb: FormBuilder,
    private repaService: RepartidorService,
    private _loading: LoadingEventService,
    private router: Router
  ) { this.form = this.initForm(); }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSelection(country:Country) {
    this.form.patchValue({ origen: country.name });
    this.selectedCountry = country;
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      capacidad: ['', Validators.required],
      origen: ['', Validators.required],
      isActive: [false, Validators.required],
    });
  }


  onSubmit() {

    this.form.get('dni')!.markAsDirty();
    this.form.get('nombre')!.markAsDirty();
    this.form.get('edad')!.markAsDirty();
    this.form.get('capacidad')!.markAsDirty();
    this.form.get('origen')!.markAsDirty();
    this.form.get('isActive')!.markAsDirty();
    if(this.form.status === 'VALID') {
      let repartidor = {
        dni: this.form.get('dni')?.value,
        nombre: this.form.get('nombre')?.value,
        edad: this.form.get('edad')?.value,
        capacidad: this.form.get('capacidad')?.value,
        origen: this.selectedCountry,
        isActive: this.form.get('isActive')?.value,
      };
      this.repaService.registrar(repartidor).then(res => {
        this.form.reset();
      });
      return;
    }
    alert('error')
  }
}
