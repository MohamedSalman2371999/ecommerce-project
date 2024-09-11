import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-commerce';
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem("lang")!==null) {
        
      }else{
        localStorage.setItem("lang", 'en')
      }
    }
  }

}
