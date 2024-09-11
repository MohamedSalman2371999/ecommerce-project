import { finalize } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { email, password, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isloaded: boolean = false
  msgError: string = ''

  private _AuthService = inject(AuthService)
  private _FormBuilder = inject(FormBuilder)
  private _Router = inject(Router)

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
    password: [null, [RxwebValidators.required(), RxwebValidators.pattern({ expression: { 'anyChar': /^\w{6,}$/ } })]],
  })

  loginSubmit(): void {
    this.isloaded = true
    if (this.loginForm.valid) {
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isloaded = false
          if (res.message == 'success') {
            localStorage.setItem('userToken', res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
          }
        }
      })
    } else {
      this.isloaded = false
      this.loginForm.markAllAsTouched()
    }
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    console.log(this.isloaded);


  }
}
