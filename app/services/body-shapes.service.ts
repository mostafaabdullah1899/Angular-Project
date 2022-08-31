import { Injectable } from '@angular/core';
import { BodyShap } from '../Enums/BodyShap';

@Injectable({
  providedIn: 'root'
})
export class BodyShapesService {

  private bodyShapes:BodyShap[]=[];
  constructor()
   {
    this.bodyShapes=
    [
      BodyShap.Cabriolet,BodyShap.Coupe,BodyShap.Hatchback,BodyShap.Pickup,
      BodyShap.SUV,BodyShap.Station,BodyShap.Sedan,BodyShap.Van
    ]
   }
  getBodyShapes()
  {
    return this.bodyShapes;

  }
}
