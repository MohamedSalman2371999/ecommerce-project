import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { ISpecific } from '../../core/interfaces/ispecific';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
private readonly _BrandsService=inject(BrandsService)
allBrands:IBrands[]=[]
specificBrands:ISpecific={} as ISpecific
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.allBrands=res.data
        console.log(res.data)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  openModel(id:string){
    this._BrandsService.getSpesificBrand(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.specificBrands=res.data
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
