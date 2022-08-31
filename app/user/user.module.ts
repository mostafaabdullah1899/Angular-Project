import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllcarsComponent } from './components/allcars/allcars.component';

import { CarbymodelComponent } from './components/carbymodel/carbymodel.component';
import { CarbybrandComponent } from '../carbybrand/carbybrand.component';
import { CarsDetailsComponent } from './components/cars-details/cars-details.component';







@NgModule({
  declarations: [
  
    CarbymodelComponent,
    CarsDetailsComponent,
  
    
    
  ],
  imports: [
    CommonModule
  ],
  exports:[
 
    CarbymodelComponent,
    ]
})
export class UserModule { }
