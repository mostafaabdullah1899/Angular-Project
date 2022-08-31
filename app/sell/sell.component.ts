import { Component, Input, OnInit, Output, ViewChild,ViewChildren } from '@angular/core';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarImageComponent } from '../car-image/car-image.component';
import { BodyShap } from '../Enums/BodyShap';
import { Transimission } from '../Enums/Transmission';
import { ICar } from '../interfaces/ICar';
import { UserCarsService } from '../services/user-cars.service';
import { TopCardComponent } from '../top-card/top-card.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  // @Input() userId:number=0;
  user_Id = sessionStorage.getItem('user_id')
  userId = Number(this.user_Id)

 carId:number=0;
 isCarDetailsCompleted:boolean=false;
 isCarImagesCompleted:boolean=false;
 isCarDetailsPassed:boolean=false;
  isCarSaved: boolean = false;
 isCarImagesPassed:boolean=false;
 nextButton:string="next";

 activeChild:number=1;   // 1 for car-details  , 2 for cr-images  , 3 for contact-info 
 errorMessage:any;
  @ViewChild(TopCardComponent) toCard! :TopCardComponent;
  @ViewChild(CarImageComponent) carImages! :CarImageComponent;
  @ViewChild(CarDetailsComponent) carDetails!:CarDetailsComponent;
  Car:ICar={   
     id:0,
    brandName:"",
    modelName:"",
    year:0,
    transmission:Transimission.automatic,
    bodyShap:BodyShap.Cabriolet,
    EngineCapacity:0,
    mileAge:0,  // in km 
    price:0,
    address:"",
    discription:"",
    poster:"",
    userId:0};
  constructor(private userServices:UserCarsService,private userCars :UserCarsService) {}
 
 
 
  testImg:any="";
  check:boolean=false;
  //eventResult:any;
  ngOnInit(): void {
    console.log(this.carDetails);
    
  }




  onclick()
  {
    if(this.isCarDetailsCompleted)
       this.isCarDetailsCompleted=false;
     else 
       this.isCarDetailsCompleted=true;  

  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.check=this.toCard.check;

    },0)
    
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  nextClicked()
  {
    console.log("nextClicked")
    switch(this.activeChild)
    {
      case 1:
        if(this.isCarDetailsCompleted)
        {
          this.isCarDetailsPassed=true;
          this.Car=this.carDetails.getCar();
          console.log(this.Car);
          this.activeChild++;
          console.log(this.Car);

          this.nextButton="submit car";

        }
        else
          this.errorMessage="car details not completed ...";
          this.setErrorMessageTimer();
        break;

      case 2:
        if(this.isCarImagesCompleted)
        {
          this.isCarImagesPassed=true;
          console.log(this.Car);
          this.Car.poster=this.carImages.getPoster().fileName;
          this.addCar(this.Car);
        }
            
        else
         this.errorMessage="please add images for your  car ....";
         this.setErrorMessageTimer();    
        break;           
    }
  }

async submitCar()
{
  console.log(this.Car);
   this.addCar(this.Car);
  console.log(this.carId);
  if(!this.carId)
  {
   alert("ther is a problem while submitting the car");
   return;
  }
  
   await this.carImages.uploadImages(this.carImages.imagesFiles,this.carId);
  
  console.log("ssubmitcar method is run ");
}
setErrorMessageTimer()
{
  setTimeout(()=>
  {
    this.errorMessage="";

  },5000)
}


addCar(car:ICar)
{

  this.Car.userId=this.userId;
  console.log(this.Car);

     this.userCars.addCar(car).subscribe(
    data=>
    {
      console.log(data);
      this.carId=data;
      this.carImages.uploadImages(this.carImages.imagesFiles,this.carId);
    },
    err=>
    {
      alert(err);
      console.log(`error message: ${err}`)
      
    }
  )
  
}


back()
{
  switch(this.activeChild)
  {
    case 2:
      this.activeChild=1;
      this.isCarDetailsPassed=false;
      this.isCarImagesCompleted=false;
      this.isCarSaved = false;
      this.isCarImagesPassed=false;
  }
}

// getImage()
// {
//   this..getCarImage().subscribe(
//     file=>
//     {
//       let fileReader=new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload=()=>
//       {
//         this.testImg=fileReader.result;
//         console.log(fileReader.result);
//       }
//       console.log(file)

//     }
//     ,
//     error=>console.log("error"+error)
//   )
// }

} 
