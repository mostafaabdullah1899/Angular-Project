import { Injectable } from '@angular/core';
import { IGovernate } from '../interfaces/IGovernate';
@Injectable({
  providedIn: 'root'
})
export class GovernatesService {
  
  private governates:IGovernate[]=[];
  constructor()
   {
    this.governates=
    [
      {
        name:"asyut",
        areas:["dayrout","qusia","manfalout","mangabat","alfatuh","abnoub","alghnaiem"]
      },
      {
        name:"cairo",
        areas:["wist albalat","fysal","alharam","khabish","bolaq","eljamalia","eldoki","mahal"]
      }

    ]
   }
  getGovernates()
  {
    return this.governates;
  }
}
