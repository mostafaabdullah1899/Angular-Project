import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcarEdit } from 'src/app/carEdit';
import { icars } from 'src/app/services/icars';
import { UsersellerService } from 'src/app/Services/userseller.service';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-updatecar',
  templateUrl: './updatecar.component.html',
  styleUrls: ['./updatecar.component.scss']
})
export class UpdatecarComponent implements OnInit {

  constructor(private userSeller: UsersellerService, private router: ActivatedRoute, private carserv:CarsService) { }

  Cities = ["Assuit", "Asswan", "Alexandria", "Cairo",
    "Gizeh", "Suez", "Luxor", "al-Mansura", "Ismailia", "al-Minya", "Qena", "Sohag",]
  currentcar!: icars[];
  userModel: IcarEdit = new IcarEdit(0, "", "", true);
  addressHasError: boolean = false;
  message: string = ""
  ngOnInit(): void {
    //this.getCar(this.router.snapshot.params['id']);
    console.warn(this.router.snapshot.params['id'])
  }

 
  validateAddress(addressValue: any) {

    if (addressValue == "default") {
      this.addressHasError = true;
    }
    else {
      this.addressHasError = false;
    }
  }

  editCar(car: IcarEdit) {
    return this.carserv.Edit(this.router.snapshot.params['id'], car).subscribe(ee => {
      this.currentcar= ee;
      window.open("http://localhost:4200/my-cars", '_self')
    })
  }
  getCar(id: number) {
    this.carserv.getcarbyid(id).subscribe(result => {
      this.currentcar = result;
    })
  }


}




