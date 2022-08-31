import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { icars } from './icars';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { }
  public _url ="http://localhost:60840/api/Car/carsToSell";
 
  
  public usedcarurl ="http://localhost:60840/usedcars"
  public newcarurl ="http://localhost:60840/newcars"

  getcars():Observable<icars[]>
  {


    return this.http.get<icars[]>(this._url).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }
  getusedcars():Observable<icars[]>
  {

    return this.http.get<icars[]>(this.usedcarurl).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }
  //////////////////////////////////////////////
  getnewcars():Observable<icars[]>
  {

    return this.http.get<icars[]>(this.newcarurl).pipe(catchError((err)=>{

return throwError(()=>err.message)


    }))
  }
  getcarbytranmission(keyword:string){
  
    return this.http.get<icars[]>('http://localhost:60840/ByTransmission?type='+keyword).pipe(catchError((err)=>{

      return throwError(()=>err.message)
      
      
          }))

  }
}
