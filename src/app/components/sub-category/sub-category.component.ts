import { Component, inject, OnInit } from '@angular/core';
import { SubCategoryService } from '../../core/services/sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { IsubCategory } from '../../core/interfaces/isub-category';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent implements OnInit{
  private readonly _SubCategoryService= inject(SubCategoryService)
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  categoryId:string | null =null
  text:string =''
  subCategoryList:IsubCategory[]=[]

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.categoryId =p.get('id')
      }
    })

    this._SubCategoryService.getAllSubCategories(this.categoryId).subscribe({
      next:(res)=>{
        if (res.data.length>0) {
          this.subCategoryList=res.data
          console.log(this.subCategoryList);
        }else{
          this.text='undefined'
        }
        
      
      }
    })
  }

}
