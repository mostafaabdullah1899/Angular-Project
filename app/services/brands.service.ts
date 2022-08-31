import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICarBrand } from '../interfaces/ICarBrand';
import { ICarModel } from '../interfaces/ICarModel';
import { ApiLinksService } from './api-links.service';
import { FilesService } from './files.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  //private brands:ICarBrand[]=[];
  constructor(private fileService:FilesService,private http:HttpClient,private apiLinks:ApiLinksService) 
  {
    // this.brands=
    // [
    //   {
    //     id:1,
    //     name:"580 Eagle",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}],
    //   },
    //   {
    //     id:3,
    //     name:"Alfa Romeo",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}]
    //   },
    //   {
    //     id:4,
    //     name:"Tesla",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}]
    //   },
    //   {
    //     id:5,
    //     name:"Aston Martin",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}]
    //   },
    //   {
    //     id:6,
    //     name:"BAIC",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}]

    //   },
    //   {
    //     id:6,
    //     name:"BMW",
    //     models:[{id:1,name:"147"},{id:2, name:"156"},{id:3,name:"187"}]

    //   }
    // ]
   }
  
  // getBrands()
  // {
  //   let brandsNames:string[]=[];
  //   for(let brand of this.brands)
  //       brandsNames.push(brand.name);
  //       return brandsNames;
  // }
  getBrandsImages(filesNames:string[])
  {
    return new Promise<string[]>((resolve,reject)=>{
      let filesUrls:string[]=[];
      for(let i=0; i<filesNames.length;i++)
      {
        this.fileService.getFile(filesNames[i],"brands").subscribe
        (
          file=>{
            this.fileService.getImageUrl(file).then(url=>filesUrls.push(url as string))
           // files.push(file);
            //console.log(file);files[i]=file
          },
          err=>alert(`error while fetching file image from api ${err}`)
        )
      }
      if(filesUrls)
        resolve(filesUrls);
      reject("ther is a problem with brands  files");  
    })
  }


  getBrandsObjects():Observable<ICarBrand[]>
  {
    return this.http.get<ICarBrand[]>(this.apiLinks.getBrands).pipe(catchError((err)=>{
      return throwError(()=>err.message);
    }))
  }

  getModelsObjects(brnadId:number):Observable<ICarModel[]>
  {
    return this.http.get<ICarModel[]>(this.apiLinks.getModelsByBrnadId,{params:{brandId:brnadId}}).pipe(catchError((err)=>{
      return throwError(()=>err.message);
    }))
  }
  // getBrandModels(brnadName:string)
  // {
  //   for(let brand of this.brands)
  //    {
  //     if(brand.name==brnadName)
  //       return brand.models;
  //    }
  //   return [{id:1,name:""}];
  // }
  
}
