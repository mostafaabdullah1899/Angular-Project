import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.scss']
})
export class MycarsComponent implements OnInit
{

  constructor(private carsservice: CarsService ,private fileservice:FilesService){ }
  cars: any = [];
  ngOnInit(): void {
    this.carsservice.getUserCars().subscribe(

      userdata => {
        this.cars = userdata;
        for(let car of this.cars)
        {
          console.log(car)
           this.fileservice.getFile(car.poster ,"usersCars").subscribe(
             async file=>{ 
              car.poster= await this.fileservice.getImageUrl(file)
              }, error=>console.log(error)
              
           )
        }
        console.log(this.cars)
      })

  }
  edit(id: number) {

  }


  
  
}
