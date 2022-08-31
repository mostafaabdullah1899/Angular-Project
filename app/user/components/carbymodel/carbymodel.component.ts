import { Component, OnInit } from '@angular/core';
import { CarbrandService } from '../../services/carbrand.service';


@Component({
  selector: 'app-carbymodel',
  templateUrl: './carbymodel.component.html',
  styleUrls: ['./carbymodel.component.scss']
})
export class CarbymodelComponent implements OnInit {

  constructor(private carbrandService:CarbrandService) { }
  carmodel:any=[];
 
  ngOnInit(): void {

    //this.carbrandService.getmodel().subscribe(
      //modeldata=>
     // {

//this.carmodel=modeldata;

   // })


  }

}
