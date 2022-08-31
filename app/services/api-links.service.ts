import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLinksService {
    
    addCar:string;
    addImages:string;
    getBrands:string;
    serveFile:string;
    uploadFiles:string;
    getModels:string;
    getModelsByBrnadId:string;
    constructor()
    {
      this.addCar ="http://localhost:60840/api/Car";
      this.addImages ="http://localhost:60840/api/Car_Images";
      this.getBrands ="http://localhost:60840/api/Car_Brand";
      this.getModels ="http://localhost:60840/api/Car_Model/GetByBrandId";
      this.serveFile ="http://localhost:60840/api/UploadImages/serveFile?";
      this.uploadFiles ="http://localhost:60840/api/UploadImages/uploadCarImage";
      this.getModelsByBrnadId ="http://localhost:60840/api/Car_Model/GetByBrandId"
    }



}
