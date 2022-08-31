import { Component, OnInit } from '@angular/core';
import { CarsService } from '../user/services/cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private carsService:CarsService) { }
  cars:any=[];
  ngOnInit(): void {
    this. carsService.getcars().subscribe(
      userdata=>
      {

this.cars=userdata;

    })
  }

}
