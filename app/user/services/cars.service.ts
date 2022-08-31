import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IcarEdit } from 'src/app/carEdit';
import { icarimages } from './icarimages';

import { icars } from './icars';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { }
  id=sessionStorage.getItem('user_id')
  user_id=Number(this.id);
  public _url="http://localhost:60840/api/Car/carsToSell";
  public _url2=`http://localhost:60840/api/Car/usersCars?id=${this.user_id}`
 
  getUserCars():Observable<icars[]>
  { 
    return this.http.get<icars[]>(this._url2).pipe(catchError((err)=>{
      return throwError(()=>err.message)
    }))
  }
  getcarsToSell():Observable<icars[]>
  {
    return this.http.get<icars[]>(this._url).pipe(catchError((err)=>{

   return throwError(()=>err.message)


    }))
  }

  getcarbyid(id:any):Observable<icars[]>
  {
    return this.http.get<icars[]>("http://localhost:60840/api/Car/"+id).pipe(catchError((err)=>{

   return throwError(()=>err.message)


    }))
  }
  Edit(id:number,car:IcarEdit):Observable<icars[]>
  {


    return this.http.put<icars[]>("http://localhost:60840/api/Car/userCar/"+id,car).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }
  //////////////////////////////////////////////////////
  getimagesbyid(id:any):Observable<icarimages[]>
  {


    return this.http.get<icarimages[]>("http://localhost:60840/api/Car/GetImagesId?carid="+id).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }
  /////////////////////////////////////////////////////
  getcarbybrandname(name:any):Observable<icars[]>
  {

   
    return this.http.get<icars[]>("http://localhost:60840/byBrand?brand="+name).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }

  public _urlpost = "http://localhost:60840/api/Reports"
  SaveReport(data: any) {
    return this.http.post(this._urlpost, data);

  }

}




