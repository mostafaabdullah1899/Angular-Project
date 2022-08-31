import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Classes/IUser';
import { Itokenparams } from 'src/app/Classes/token';

import { NgForm } from '@angular/forms';
import { UsersellerService } from 'src/app/Services/userseller.service';





@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private userSeller: UsersellerService) { }


  usertoken!:Itokenparams
  addressHasError: boolean = false;
  ngOnInit(): void {
  }
  user: IUser = {
    full_Name: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
    phone: "",
    address: "",
  }

  postData(data:any) {
    this.userSeller.postData(data).subscribe(result=>{
      this.usertoken=result;
     sessionStorage.setItem('mytoken',this.usertoken.token);
     sessionStorage.setItem('user_id',String(this.usertoken.id))
      window.open("/sell","_self");
      
     
    },error=>alert(("Email or Password is not valid")))
    
  }
  


}
