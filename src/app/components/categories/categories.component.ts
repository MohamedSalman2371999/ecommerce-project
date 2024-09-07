import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly _CategoriesService = inject(CategoriesService)
allcategories:Icategories[]=[]

ngOnInit(): void {
  this._CategoriesService.getAllCategoreis().subscribe({
    next:(res)=>{
      this.allcategories=res.data
      console.log(res);
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}
}
