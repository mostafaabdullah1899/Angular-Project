import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilesService } from '../services/files.service';
import { CarsService } from '../user/services/cars.service';



@Component({
  selector: 'app-carsbybrand',
  templateUrl: './carsbybrand.component.html',
  styleUrls: ['./carsbybrand.component.scss']
})
export class CarsbybrandComponent implements OnInit {
  carsbybrand:any=[];
  name:any;
  constructor(private route:ActivatedRoute,private carsService:CarsService , private fileservice:FilesService) {


     this.name=this.route.snapshot.paramMap.get('brandname');
      
    

console.log(this.name)
   }
  
  ngOnInit(): void {
    this.getcarbybrandname()
  }
  getcarbybrandname(){


    this.carsService.getcarbybrandname(this.name).subscribe(
      (res:any)=>
      {
        console.log(res)
       

        this.carsbybrand = res

        console.log(this.carsbybrand)
        this.carsbybrand = res;
        console.log(res)
        for (let car of this.carsbybrand) {
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              console.log(file)
              car.poster = await this.fileservice.getImageUrl(file);

              
            }

          )
        }
  
  this.carsbybrand=res
  
    })
  
  
  }

}
