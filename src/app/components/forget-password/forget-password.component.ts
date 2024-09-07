import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
private readonly _AuthService=inject(AuthService)
private readonly _FormBuilder=inject(FormBuilder)
private readonly _Router=inject(Router)
isLoaded:boolean=false
msgError:string=''
steps:number=1

verifyEmailform:FormGroup=this._FormBuilder.group({
  email :[null,[RxwebValidators.required(),RxwebValidators.email()]],
})
verifyResetCodeForm:FormGroup=this._FormBuilder.group({
  resetCode :[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'anyChar':/^\w{6,}$/} })]],
})
verifyResetPasswordForm:FormGroup=this._FormBuilder.group({
  email :[null,[RxwebValidators.required(),RxwebValidators.email()]],
  newPassword :[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'anyChar':/^\w{6,}$/} })]],
})

verifyEmail():void{
  this.isLoaded=true
  if(this.verifyEmailform.valid){
    this._AuthService.setVerifyEmail(this.verifyEmailform.value).subscribe({
      next:(res)=>{
        this.isLoaded=false
        console.log(res);
        if (res.statusMsg=='success') {
          this.steps=2
        }
        
      },error:(err)=>{
        this.isLoaded=false
        console.log(err);
      }
    })
  }
}
verifyResetCode():void{
  this.isLoaded=true
  if(this.verifyResetCodeForm.valid){
    this._AuthService.setVerifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next:(res)=>{
        this.isLoaded=false
        console.log(res);
        if(res.status=="Success"){
          this.steps=3
        }
        
      },error:(err)=>{
        this.isLoaded=false
        console.log(err);
      }
    })
  }
}
verifyResetPassword():void{
  this.isLoaded=true
  if(this.verifyResetPasswordForm.valid){
    this._AuthService.setVerifyResetPassword(this.verifyResetPasswordForm.value).subscribe({
      next:(res)=>{
        this.isLoaded=false
        console.log(res);
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },error:(err)=>{
        this.isLoaded=false
        console.log(err);
      }
    })
  }
}

}
