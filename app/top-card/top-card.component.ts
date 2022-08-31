import { Component, Input, OnInit } from '@angular/core';
import { Arrows } from '../classes/Arrows';
// import { Arrows } from '../classes/Arrows';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.scss']
})
export class TopCardComponent implements OnInit {

  constructor(private Arrows:Arrows) { }

  ngOnInit(): void {
  }
  @Input() isCarDetailsCompleted: boolean=true;
  @Input() isCarImagesCompleted=false;
  @Input() isContactInfoCompleted=false;
  @Input() isCarDetailsPassed:boolean=false; 
  @Input() isCarImagesPassed=false;
  @Input() isContactInfoPassed=false;
  @Input() isCarSaved = false;
  imagesPath:string="../assets/images/sell/";
  CarDetailsCircle=
  {
    "whiteCircle":!this.isCarDetailsCompleted,
    "blueCircle":this.isCarDetailsCompleted,
    'circle':true
  }
  CarImagesCircle:any=
  {
    "whiteCircle":!this.isCarImagesCompleted,
    "blueCircle":this.isCarImagesCompleted
  }
  contactInfoCircle=
  {
    "whiteCircle":!this.isContactInfoCompleted,
    "blueCircle":this.isContactInfoCompleted
  }
  
  carDetailsArrows=this.Arrows;
  carImagesArrows=this.Arrows;
  contactInfoArrows=this.Arrows;

  clicked()
  {

    if(this.check)
      this.check=false;
    else 
       this.check=true;  
    if(this.isCarDetailsCompleted)
      this.isCarDetailsCompleted=false;
    else
     this.isCarDetailsCompleted=true;
  
  }
  check:boolean=false;


}
