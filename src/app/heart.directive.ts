import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeart]',
  standalone: true
})
export class HeartDirective {

  // constructor(private readonly el:ElementRef) {
  //   localStorage.getItem('heartColor')
  // }



  // @HostListener('click') fillheart(){
  //   localStorage.setItem('heartColor','red')

  //   this.el.nativeElement.style.color=`${localStorage.getItem('heartColor')}`
  // }
}
