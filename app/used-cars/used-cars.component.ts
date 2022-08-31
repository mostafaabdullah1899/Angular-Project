import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-used-cars',
  templateUrl: './used-cars.component.html',
  styleUrls: ['./used-cars.component.scss']
})
export class UsedCarsComponent implements OnInit {
  usedcars:any=[];
  constructor(private carsService:CarsService, private fileservice :FilesService) { }

  ngOnInit(): void {
    this.getusedcars();
  }
  getusedcars(){


    this.carsService.getusedcars().subscribe(
      (usedcars)=>
          {
        this.usedcars = usedcars
        for (let car of this.usedcars) {
          console.log(car)
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              car.poster = await this.fileservice.getImageUrl(file)
            }, error => console.log(error)

          )
        }
        console.log(usedcars);
        
  
    })
  
  
  }
}
