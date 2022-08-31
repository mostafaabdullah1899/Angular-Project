import { Component, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/Classes/IUser';

import { UsersellerService } from 'src/app/Services/userseller.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userSeller: UsersellerService) { }

  Cities = ["Assuit", "Asswan", "Alexandria", "Cairo",
    "Gizeh", "Suez", "Luxor", "al-Mansura", "Ismailia", "al-Minya", 
    "Qena", "Sohag",]

  addressHasError: boolean = false;
  validateAddress(addressValue: any) {

    if (addressValue == "default") {
      this.addressHasError = true;
    }
    else {
      this.addressHasError = false;
    }
  }

 
Message:any="";
errorMessage:any="";

user:IUser={
  full_Name: "",
  email: "",
  passWord: "",
  confirmPassWord: "",
  phone: "",
  address: "",
}

OnSubmit(user:IUser)
{
  console.log(user);
  this.userSeller.AddUser(this.user).subscribe(

    Data => {
      
      this.Message= Data;
      window.open("/login-page", '_self')

    },
    error => { this.errorMessage = error }

  )

}
  ngOnInit(): void {
  }

}

