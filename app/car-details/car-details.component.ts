import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandsService } from '../services/brands.service';
import { GovernatesService } from '../services/governates.service';
import { BodyShap } from '../Enums/BodyShap';
import { BodyShapesService } from '../services/body-shapes.service';
import { ICarBrand } from '../interfaces/ICarBrand';
import { IGovernate } from '../interfaces/IGovernate';
import { ICar } from '../interfaces/ICar';
import { Transimission } from '../Enums/Transmission';
import { ICarModel } from '../interfaces/ICarModel';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { UserCarsService } from '../services/user-cars.service';
import { FilesService } from '../services/files.service';
import { window } from 'rxjs';
import { __await, __awaiter } from 'tslib';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  brands:ICarBrand[]=[];
  models:ICarModel[]=[];
  selectedBrandLogo:string="";
  bodyShapes:BodyShap[]=[];
  governates:IGovernate[]=[];
  srcImages:string="../assets/images/";
  years:number[]=[];
  engineCapacites:number[]=[];
  isAutomatic:boolean=false;
  isManual:boolean=false;
  // @Input() userId=0;
  user_Id = sessionStorage.getItem('user_id')
  userId = Number(this.user_Id)

  Car:ICar=
  {id:0,brandName:"",modelName:"",year:0,transmission:Transimission.notSelectd
    ,bodyShap:BodyShap.notSelectd,EngineCapacity:0,mileAge:10,price:50000,address:"",discription:"",userId:this.userId
    ,poster:""
  }
  @Output() carDetailsCompleted=new EventEmitter();
  @Output() carId=new EventEmitter();
  constructor(private BrandsService:BrandsService,private BodyShapes:BodyShapesService ,
    private Governates:GovernatesService,private userCars :UserCarsService,private fileService:FilesService)
     {
      this.bodyShapes=this.BodyShapes.getBodyShapes();
      this.governates=this.Governates.getGovernates();
      this.intializeYears(2023,8);
      this.intializeEngineCapacites(1200,8);
      this.getBrands();
     }

  ngOnInit(): void {
  }
  brandSelected(brand:ICarBrand)
  {
    console.log(brand);
    this.modifySelectedItem(brand.brandName,"brand");
    this.Car.brandName=brand.brandName;
    this.Car.modelName="";
    this.Car.year=0;
    this.Car.bodyShap=BodyShap.Coupe;
    this.isDataCompleted();
    this.getModels(brand);

  }

  intializeYears(lastYear:number,yearsNum:number)
  {
    for(let i=1; i<=yearsNum; i++)
     this.years.push(lastYear--);
     console.log(this.years)
  }
  intializeEngineCapacites(startCapacity:number, numCapacites:number)
  {
    for(let i=1; i<numCapacites; i++)
    {
      this.engineCapacites.push(startCapacity);
      startCapacity+=100;

    }
      

  }
  modelSelected(modelName:string)
  {
    this.modifySelectedItem(modelName,"model");
    this.Car.modelName=modelName;
    document.getElementById(this.Car.year.toString())?.classList.remove("selected");
    document.getElementById(this.Car.transmission)?.classList.remove("selected");
    this.isDataCompleted();

  }
  yearSelected(year:number)
  {

    this.modifySelectedItem( year.toString(),"year");
    this.Car.year=year;
    this.isDataCompleted();

  }
  transmissionSelected(transmission:string)
  {
    this.modifySelectedItem(transmission,"transmission");
    switch(transmission)
    { 
      case "manual":
        this.isAutomatic=false;
        this.isManual=true;
        this.Car.transmission=Transimission.manual;
        break;
      case "automatic":
        this.isAutomatic=true;
        this.isManual=false;
        this.Car.transmission=Transimission.automatic;
        break;
    }
    this.isDataCompleted();    

  }
  bodyShapSelected(shap:BodyShap)
  {
    this.modifySelectedItem(shap,"bodyShape");
    let oldSelectedShap=document.getElementById(this.Car.bodyShap);
    oldSelectedShap?.setAttribute('src',`${this.srcImages}bodyShapes/${this.Car.bodyShap}-unSelected.png`);
    console.log(oldSelectedShap);
    let selectedShap=document.getElementById(shap);
    selectedShap?.setAttribute('src',`${this.srcImages}bodyShapes/${shap}-selected.png`);
    this.Car.bodyShap=shap;
    this.isDataCompleted();
  }
  engineCapacitySelected(engineCapacity:number)
  {
    this.modifySelectedItem(engineCapacity.toString(),"engineCapacity");
    this.Car.EngineCapacity=engineCapacity;
    this.isDataCompleted();

  }
  modifySelectedItem(itemName:string,itemtype:string)
  {
    let oldSelectedItem;
    switch(itemtype)
    {
      case "model":
        oldSelectedItem=document.getElementById(this.Car.modelName);
        break;
      case "brand":
        oldSelectedItem=document.getElementById(this.Car.brandName);
        break;
      case "year" :
        oldSelectedItem=document.getElementById(this.Car.year.toString());
        break;
      case "transmission":
        oldSelectedItem=document.getElementById(this.Car.transmission);
        break;
      case "bodyShape":
        oldSelectedItem=document.getElementById(this.Car.bodyShap);
        break;
      case "engineCapacity" :
        oldSelectedItem=document.getElementById(this.Car.EngineCapacity.toString());
        break;     

    }
      
    let newSelectedItem=document.getElementById(itemName);
    oldSelectedItem?.classList.remove("selected");
    newSelectedItem?.classList.add("selected");
  }
  updateMileAge(updateState:boolean)
  {
    switch(updateState)
    {
      case true:
        this.Car.mileAge++;
        break;
      case false:
        if(this.Car.mileAge>0)
           this.Car.mileAge--;
        break;  
    }
  }
  updatePrice(updateState:boolean)
  {
    switch(updateState)
    {
      case true:
        this.Car.price+=1000;
        break;
      case false:
        if(this.Car.price>5000)
           this.Car.price-=1000;
        break;  
    } 
  }
  isDataCompleted()
  {

    let car=this.Car;
    let isCarDetailsCompleted:boolean=false;
    if(
      car.brandName  && car.modelName && car.EngineCapacity 
      && car.address && car.bodyShap&& car.mileAge && car.price 
      &&  car.year && car.transmission 
      )
       isCarDetailsCompleted=true;

      this.carDetailsCompleted.emit(isCarDetailsCompleted);


  }
 getCar()
 {
  return this.Car;
 }

 getBrands()
 {
  let brandsLogos:string[]=[];
  let brandsImages:string[]=[];
  let brandsNames:string[]=[];
 let  urls:string[]=[];
  this.BrandsService.getBrandsObjects().subscribe(
    async brands=>
    {
      for(let brand of brands)
      {
        brandsNames.push(brand.brandName);
        brandsLogos.push(brand.brandLogo);
      }
      for(let i=0; i< brandsLogos.length; i++)
      {
        this.fileService.getFile(brandsLogos[i],"brands").subscribe(
          async file=>
          {
            let urlimg=await this.fileService.getImageUrl(file);
            this.brands.push({brandName:brandsNames[i],brandLogo:urlimg,id:brands[i].id})
            console.log(brands);
          },
          err=>alert(err)
        )
      }
    },
    err=>alert(err)
  )

 }
 
 getModels(brand:ICarBrand)
 {

 let  urls:string[]=[];
 this.selectedBrandLogo=brand.brandLogo;
 console.log(this.selectedBrandLogo);
 console.log(brand);
 
  this.BrandsService.getModelsObjects(brand.id).subscribe(
    async models=>
    {   
   this.models=models;
   console.log(this.models);
   for(let model of this.models)
     console.log(model.model_Name);
 }
)}

 filesTest:any[]=[];
 inputClick(e:any)
 {
  this.filesTest.push(e.target?.files[0])
  console.log(this.filesTest);
  
 }
 getUrls()
 {
   this.fileService.getImagesUrls(this.filesTest as File[]).then
   (
    urls=>console.log(urls)
   )
 }


}
