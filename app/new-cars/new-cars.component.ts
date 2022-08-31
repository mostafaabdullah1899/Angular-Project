import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { FilesService } from '../services/files.service';
@Component({
  selector: 'app-new-cars',
  templateUrl: './new-cars.component.html',
  styleUrls: ['./new-cars.component.scss']
})
export class NewCarsComponent implements OnInit {
  newcars:any=[]
  constructor(private carsService:CarsService,private fileservice:FilesService) { }

  ngOnInit(): void {
    this.getnewcars()
  }
  getnewcars(){

    this.carsService.getnewcars().subscribe(
      (newcars) => {
        this.newcars = newcars
        for (let car of this.newcars) {
          console.log(car)
          this.fileservice.getFile(car.poster, "usersCars").subscribe(
            async file => {
              car.poster = await this.fileservice.getImageUrl(file)
            }, error => console.log(error)

          )
        }
        console.log(newcars);


      }
                  )
  
  
  }
}
