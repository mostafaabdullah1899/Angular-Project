

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CarDetailsComponent } from "./car-details/car-details.component";
import { CarImageComponent } from "./car-image/car-image.component";
import { CarbybrandComponent } from "./carbybrand/carbybrand.component";
import { CarsbybrandComponent } from "./carsbybrand/carsbybrand.component";
import { Arrows } from "./classes/Arrows";
import { LoginPageComponent } from "./Components/login-page/login-page.component";
import { RegisterComponent } from "./Components/register/register.component";
import { ExploreComponent } from "./explore/explore.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthInterceptor } from "./Helpers/auth.interceptor";
import { NewCarsComponent } from "./new-cars/new-cars.component";
import { SellComponent } from "./sell/sell.component";

import { TopCardComponent } from "./top-card/top-card.component";
import { UsedCarsComponent } from "./used-cars/used-cars.component";
import { AllcarsComponent } from "./user/components/allcars/allcars.component";
import { MycarsComponent } from "./user/components/mycars/mycars.component";
import { UpdatecarComponent } from "./user/components/updatecar/updatecar.component";
 import { UserModule } from "./user/user.module";


@NgModule({
  declarations: [
    AppComponent,
    AllcarsComponent,
    NewCarsComponent,
    UsedCarsComponent,
    CarbybrandComponent,
    CarsbybrandComponent,
    ExploreComponent,
    FooterComponent,
    RegisterComponent,
    SellComponent,
    TopCardComponent,
    CarDetailsComponent,
    CarImageComponent,
    LoginPageComponent,
    MycarsComponent,
    UpdatecarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,

  ],
  providers: [Arrows, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
