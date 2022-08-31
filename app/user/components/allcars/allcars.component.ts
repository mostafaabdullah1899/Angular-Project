import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';
import { CarbrandService } from 'src/app/services/carbrand.service';
import { FilesService } from 'src/app/services/files.service';
import { CarsService } from '../../services/cars.service';
import { CarsbymodelService } from '../../services/carsbymodel.service';
@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.scss']
})
export class AllcarsComponent implements OnInit {
  constructor(private carsService:CarsService,private carbrandService:CarbrandService,
   private carsbymodelService :CarsbymodelService  , private brandservice:BrandsService, private fileservice:FilesService ) { }
  cars:any=[];
  carmodel:any=[];
  carbrand:any=[];
  arrimage=[]
  loading:boolean=false

//filter by brand
  filterbrand(event:any)
  { 
    
   let  value=event.target.value;
    this.getModelByBrandName(value)
    this.loading=true;
   (value=="all") ? this. carsService.getcarsToSell().subscribe(
    userdata=>
    {
       this.cars=userdata;
     
       
     }, err => alert(err)) 
    :  this.getbrand(value);

  this.loading=false;
  }
  
  //filter by model
  filtermodel(event:any)
  {
    let  value=event.target.value;
     console.log(value);
    (value=="all") ? this. carsService.getcarsToSell().subscribe(
     userdata=>
     {
       this.cars=userdata;
        
 
   })  :  this.getbymodel(value);
 
  
   }
  getbymodel(Keyword: string) {


    this.carsbymodelService.getmodel(Keyword).subscribe(
      (res: any) => {

        this.cars = res
        
        console.log(this.cars)
        this.cars = res;
        console.log(res)
        for (let car of res) {
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              console.log(file)
              car.poster = await this.fileservice.getImageUrl(file);

              // car.poster =urlimg
            }// }, err => alert(err) 

          )
        }

      })


  }
  ngOnInit(): void {
 //get all cars
    this.loading=true;
    this. carsService.getcarsToSell().subscribe(
      userdata=>
      {
    console.log(this.cars)
    this.cars=userdata;
    console.log(userdata)
        for (let car of userdata) {
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              console.log(file)
              car.poster = await this.fileservice.getImageUrl(file);

              // car.poster =urlimg
            }// }, err => alert(err) 

          )
        }
    
    })
    this.loading=false;
    
 //get all brands
    this.carbrandService.getmodel().subscribe(
      branddata=>
      {
        

     this.carbrand=branddata;
        console.log(this.carbrand)

    })


  }

  getModelByBrandName( brandName:string)
  {
   let brandId = this.getBrandId(brandName)
     this.brandservice.getModelsObjects(brandId).subscribe(
     models => this.carmodel = models,
      err=>alert(err)
   )

    // return brandModels
  }

  getBrandId(brandName: string)
  {
    for (let brand of this.carbrand)
    {
       if(brand.brandName==brandName)
       {
         return brand.id
         
        }
      
    }
    return 
  }
  

  getbrand(Keyword:string){


    this.carbrandService.getbrand(Keyword).subscribe(
      (res:any)=> {
  
     this.cars=res
        console.log(this.cars)
        this.cars = res;
        console.log(res)
        for (let car of res) {
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              console.log(file)
              car.poster = await this.fileservice.getImageUrl(file);

              // car.poster =urlimg
            }// }, err => alert(err) 

          )
        }
  
    })
  
  
  }

}

