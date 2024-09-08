import { dirname } from 'node:path';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let savedLang = localStorage.getItem('lang')
  
      this._TranslateService.setDefaultLang('en')
  
      this._TranslateService.use(savedLang!)
      this.changeDirction()
    }
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


