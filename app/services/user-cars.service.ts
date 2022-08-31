import { Injectable } from '@angular/core';
import { ICar } from '../interfaces/ICar';
import { iICarImages } from '../interfaces/ICarImages';
import { ApiLinksService } from './api-links.service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCarsService {

  CarUrl:string="";
  CarImagesUrl:string="";
  links:any=[];

  constructor(private ApILinks:ApiLinksService,private http:HttpClient) 
  {
   }

 
 
  addCar(car:ICar):Observable<number>
  {
    let submitedCar=
    {
      price: car.price,
      mileage: car.mileAge,
      made_Year: car.year,
      engine_Capacity: car.EngineCapacity,
      transmission: car.transmission,
      car_Address: car.address,
      description: car.discription,
      car_Brand_Name: car.brandName,
      car_Model_Name: car.modelName,
      userId: car.userId,
      poster:car.poster
    }
    console.log(submitedCar);
    
    //console.log(car);
    this.links=this.ApILinks.addCar;
    //console.log(this.links.addCar)
    return this.http.post<number>(this.ApILinks.addCar,submitedCar).pipe(catchError((err)=>
    {
      return throwError(()=>err.message ||"interna servar error");
    }));

  }
  addImage(image:File)
  {
    const formData = new FormData();
    
  }

  addCarImagesStrings(carImages:iICarImages)
  {
    return this.http.post(this.ApILinks.addImages,carImages).pipe(catchError((err)=>{
      return throwError(()=>err.message);
    }))

  }



}
