import { Injectable } from '@angular/core';
import { IUser } from '../Classes/IUser';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itokenparams } from '../Classes/token';
@Injectable({
  providedIn: 'root'
})
export class UsersellerService {

  constructor(private http: HttpClient) { }

  public _url = "http://localhost:60840/api/Account/register";
  AddUser(user:IUser)
   {
    return this.http.post(this._url, user).pipe(catchError
      ((err) =>
      {
        return throwError(() => err.message || "Internal Server Error")
      }
      ))
      
  }


 // Login Action
  url = "http://localhost:60840/api/Account/login"
  postData(user: any): Observable<Itokenparams> {
    //call to backend
    return this.http.post<Itokenparams>(this.url, user).pipe(catchError((err => {
      return throwError(() => err.message || "internal server ")
    })
    ))
  }
}
