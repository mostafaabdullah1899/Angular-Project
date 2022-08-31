import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  cars:any=[];
  carbytranstion:any=[];
  constructor(private carsService:CarsService,private http:HttpClient,private fileservice:FilesService) { }
  filtertransition(event:any){
    let  value=event.target.value;
     console.log(value);
    (value=="all") ? this. carsService.getcars().subscribe(
     userdata=>
     {
          this.cars=userdata;
 
   })  :  this.getcarbytranmission(value);
 
   
   }

  ngOnInit(): void {
    this. carsService.getcars().subscribe(
      userdata=>
      {

this.cars=userdata;
        for (let car of this.cars) {

          console.log(car)

          this.fileservice.getFile(car.poster, "usersCars").subscribe(

            async file => {

              car.poster = await this.fileservice.getImageUrl(file)

            }, error => console.log(error)


          )

        }

    })
    
  }
  
  getcarbytranmission(Keyword:string){

  this.carsService.getcarbytranmission(Keyword).subscribe(
    (res:any)=>
    {


this.cars=res

      
      for (let car of this.cars) {

        console.log(car)

        this.fileservice.getFile(car.poster, "usersCars").subscribe(

          async file => {

            car.poster = await this.fileservice.getImageUrl(file)

          }, error => console.log(error)


        )

      }
  })


}

}
