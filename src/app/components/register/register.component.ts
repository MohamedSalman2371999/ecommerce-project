import { routes } from './../../app.routes';
import { Router, Routes } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl ,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoaded:boolean=false
private readonly _AuthService =inject(AuthService)
private readonly _formBilder =inject(FormBuilder)
private readonly _Router =inject(Router)

resgisterForm:FormGroup = this._formBilder.group({
  name :[null,[RxwebValidators.required(),RxwebValidators.maxLength({value:20 }),RxwebValidators.minLength({value:3 })]],
  email :[null,[RxwebValidators.required(),RxwebValidators.email()]],
  password :[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'anyChar':/^\w{6,}$/} })]],
  rePassword :[null,[RxwebValidators.required(),RxwebValidators.compare({fieldName:'password'})]],
  phone :[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'onlyEgNumber':/^01[0125][0-9]{8}$/} })]],
})


  // resgisterForm:FormGroup = new FormGroup({
  //   name :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email :new FormControl(null,[Validators.required,Validators.email]),
  //   password :new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword :new FormControl(null),
  //   phone :new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  // },this.confirmPassword)

  registerSubmit():void{

    this.isLoaded=true
    if(this.resgisterForm.valid){
      this._AuthService.setRegisterForm(this.resgisterForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoaded=false
          if (res.message=='success') {
            this._Router.navigate(['/login'])            
          }
        },
        error:(err)=>{
          this.isLoaded=false
        }
      })
    }else{
      console.log(this.resgisterForm);
      this.resgisterForm.markAllAsTouched()
      this.isLoaded=false
    }
  }
  //>>>>>>>>>>>>>>>> custom validation for confirm pass return the error in form 
  // confirmPassword(g:AbstractControl){
  //   if(g.get('password')?.value === g.get('rePassword')?.value){
  //     return null
  //   }else{
  //     return {mismatch:true}
  //   }
  // }
}
