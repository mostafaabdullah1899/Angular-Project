import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarbybrandComponent } from './carbybrand/carbybrand.component';
import { CarsbybrandComponent } from './carsbybrand/carsbybrand.component';
import { SellComponent } from './sell/sell.component';
import { ExploreComponent } from './explore/explore.component';
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { AllcarsComponent } from './user/components/allcars/allcars.component';
import { CarsDetailsComponent } from './user/components/cars-details/cars-details.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterComponent } from './Components/register/register.component';
import { NewCarsComponent } from './new-cars/new-cars.component';
import { MycarsComponent } from './user/components/mycars/mycars.component';
import { UpdatecarComponent } from './user/components/updatecar/updatecar.component';


const routes: Routes = [

 {path:'',component:AllcarsComponent },
  { path: 'my-cars', component: MycarsComponent }
  ,
  {path:'allcars',component:AllcarsComponent}
  ,
  { path: 'updatecar/:id', component: UpdatecarComponent }
  ,
  { path: "register", component: RegisterComponent },
  { path: "login-page", component: LoginPageComponent },
  {path:'carbybrand',component:CarbybrandComponent,


  children:[
    {path:'usedcars',component:UsedCarsComponent },
    {path:'newcars',component:NewCarsComponent },
    {path:'explorecars',component:ExploreComponent }
    
    
  ]


},
{path:'details/:id',component:CarsDetailsComponent },
{path:'model/:brandname',component:CarsbybrandComponent},
{path:'sell',component:SellComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
