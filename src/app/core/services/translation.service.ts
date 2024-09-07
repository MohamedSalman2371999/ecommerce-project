import { dirname } from 'node:path';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _TranslateService = inject(TranslateService)

  constructor() {
    let savedLang = localStorage.getItem('lang')

    this._TranslateService.setDefaultLang('en')

    this._TranslateService.use(savedLang!)
    this.changeDirction()
  }
  changeDirction(): void {
    let savedLang = localStorage.getItem('lang')
    if (savedLang === 'en') {
      document.documentElement.dir='ltr'
    } else if (savedLang === 'ar') {
      document.documentElement.dir='rtl'
    }
  }
  chageLang(lang :string):void{
    localStorage.setItem("lang",lang)
    this._TranslateService.use(lang)
    this.changeDirction()
  }
}


