import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/app/services/files.service';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-cars-details',
  templateUrl: './cars-details.component.html',
  styleUrls: ['./cars-details.component.scss']
})
export class CarsDetailsComponent implements OnInit {
  cardetail:any={};
  id:any;
  carimges:any=[];

  constructor(private route:ActivatedRoute,private carsService:CarsService , private fileservice:FilesService) 
  { 
this.id=this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    
    this.getcarbyid();
    this.getimagesbyid();
  }
  getcarbyid()
  {
    this.carsService.getcarbyid(this.id).subscribe(
      (res:any)=>
      {
  this.cardetail=res
  console.log( this.cardetail)
  
    })
  }

  //getimagesbyid
  getimagesbyid()
  {
    this.carsService.getimagesbyid(this.id).subscribe(
      (res:any)=>
      {
        this.carimges = res
        console.log(this.carimges)
        console.log(res)
        for (let i=0;i<this.carimges.length;i++) {
          this.fileservice.getFile(this.carimges[i], "usersCars").subscribe(
            async file => {
              console.log(file)
              this.carimges[i] = await this.fileservice.getImageUrl(file);

              
            }// }, err => alert(err) 

          )
        }
        console.log(res)
        
  this.carimges=res
 
  console.log( this.carimges)
    })
  }

  report(val:string,id:number)
  {
    let data={"report":val,"reportsCar_Id":id}
    this.carsService.SaveReport(data).subscribe((result)=>{
console.log(result);

    })
    alert("Your Report Sent succesfully")

  }


  
}
