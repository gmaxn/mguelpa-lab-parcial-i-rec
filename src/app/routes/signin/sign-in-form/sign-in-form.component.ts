import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  public isSignup: boolean = false;

  public form: FormGroup;

  public validations: any = {};

  public check: string = '';

  @Output() signup: EventEmitter<any> = new EventEmitter<any>();
  @Output() signin: EventEmitter<any> = new EventEmitter<any>();



  constructor(
    private fb: FormBuilder
  ) { 
    this.form = this.initForm();
  }

  ngOnInit(): void { }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d).{8,}$/)]],   
      confirm: ['', [Validators.required, Validators.pattern(/^(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d).{8,}$/)]],
    });
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
    this.form.reset();
  }

  submit() {
    if(this.isSignup) {
      if(this.validate()) {
        this.signup.emit({
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value
        });
      }
    }
    if(!this.isSignup) {
        this.signin.emit({
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value
        });
    }
  }

  validate() {
    let controls = Object.keys(this.form.controls);
    let isValid = true;
    controls.map(c => {
      let error = this.form.get(c)?.errors;
      if(error) {
        isValid = false;
        this.validations[c] = {};
        this.validations[c].inputClass = 'is-invalid';
        this.validations[c].tooltipClass = 'invalid-feedback';
        this.validations[c].message = this.getMessage(Object.keys(error)[0]);
      }
      else {
        this.validations[c] = {};
        this.validations[c].inputClass = 'is-valid';
        this.validations[c].tooltipClass = 'valid-feedback';
      }
    });

    return isValid;
  }

  getMessage(input: string) {
    let result = '';
    switch (input) {
      case 'required':
        result = 'Campo requerido.';
        break;
      case 'email':
        result = 'Email invalido.';
        break;
      case 'pattern':
        result = 'La contraseña no es lo suficientemente segura.';
        break;
      case 'confirm':
        result = 'Las contraseñas no coinciden.';
        break;
      }
      return result;
  }

  passwordCheck(): ValidationErrors | null {
    const pass = this.form.get('password');
    const confirm = this.form.get('confirm');
    if(pass !== null && confirm !== null) {
      if (pass.dirty && confirm!.dirty && confirm.value !== pass.value) {
        return { 'confirm': true };
      }
    }
    return null;
  }

  auto(role:string) {
    if(this.isSignup) {
      this.form.get('username')?.patchValue(`test_${Date.now()}@user.com`);
      this.form.get('password')?.patchValue("123456q!");
      this.form.get('confirm')?.patchValue("123456q!");
    } else {
      switch(role) {
        case 'user':
          this.form.get('username')?.patchValue("test@user.com");
          this.form.get('password')?.patchValue("123456Q!");
        break;
        case 'admin':
          this.form.get('username')?.patchValue("admin@user.com");
          this.form.get('password')?.patchValue("123456Q!");
        break;
      }
    }
  }


  log() {
    console.log(this.check)
  }
}
