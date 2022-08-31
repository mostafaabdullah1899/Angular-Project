import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ContactCars';
  authentication = sessionStorage.getItem('mytoken');


  

  logout() {
    sessionStorage.removeItem('mytoken');
    window.open("/login-page", "_self");
  }
  CheckLogin()
  {
    if (sessionStorage.getItem('mytoken')==null)
    {
      
      window.open("/login-page", "_self");
    }
    else
    {
      window.open("/sell", "_self");     
    }
  }
}
