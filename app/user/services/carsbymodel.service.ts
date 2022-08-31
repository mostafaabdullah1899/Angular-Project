import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { icars } from 'src/app/services/icars';



@Injectable({
  providedIn: 'root'
})
export class CarsbymodelService {

  constructor(private http:HttpClient) { }
  getmodel(keyword:string){
    
    return this.http.get<icars[]>('http://localhost:60840/byModel?Model='+keyword).pipe(catchError((err)=>{

      return throwError(()=>err.message)
      
      
          }))

  }
}
