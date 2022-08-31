import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { catchError, Observable, throwError } from 'rxjs';
import { icars } from 'src/app/services/icars';
import { environment } from 'src/environments/environment';
import { icarbrand } from './carbrand';
@Injectable({
  providedIn: 'root'
})
export class CarbrandService {

  constructor(private http:HttpClient) { }
 

  getbrand(keyword:string){

    return this.http.get<icars[]>('http://localhost:5278/byBrand?brand='+keyword).pipe(catchError((err)=>{

      return throwError(()=>err.message)
      
      
          }))

  }
  
 
}
