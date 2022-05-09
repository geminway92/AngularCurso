import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatoService.nombreApellidoPattern )]],
    email: ['', [ Validators.required, Validators.pattern( this.validatoService.emailPattern )], [ this.emailValidator]],
    username: ['', [ Validators.required, this.validatoService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
    
  }, {
    validators: [ this.validatoService.camposIguales('password', 'password2')]
  }) 

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors

    if( errors?.['required'] ){
      return 'Email es obligatorio'
    }else if( errors?.['pattern'] ){
      return 'El valor ingresado no tiene formato de correo';
    } else if ( errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private validatoService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Gema Martin',
      email: 'test1@test.com',
      username: 'gema72',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value)

    this.miFormulario.markAllAsTouched()
  }
}
