import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {
  readonly _TranslationService = inject(TranslationService)
  readonly _TranslateService = inject(TranslateService)
 

   Change(lang:string):void{
  this._TranslationService.chageLang(lang)
 }
}
