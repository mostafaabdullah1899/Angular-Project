import { Component, OnInit } from '@angular/core';
import { CarbrandService } from '../services/carbrand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-carbybrand',
  templateUrl: './carbybrand.component.html',
  styleUrls: ['./carbybrand.component.scss']
})
export class CarbybrandComponent implements OnInit {

  constructor(private carbrandService:CarbrandService,private router:Router,private activatedRoute:ActivatedRoute,private fileservice:FilesService ) { }
  carmodel:any=[];
  ngOnInit(): void
   {
    this.carbrandService.getmodel().subscribe(
     
      modeldata=>
      {
         this.carmodel=modeldata;
        console.log(this.carmodel)
        for(let i =0 ; i<this.carmodel.length ; i++)
        {
         this.fileservice.getFile(this.carmodel[i].brandLogo, "brands").subscribe(
            async file => {
              let urlImg = await this.fileservice.getImageUrl(file);
             this.carmodel[i].brandLogo = urlImg
             console.log(this.carmodel[i].brandLogo);
            },
            err => alert(err)
          )


        }

      })
    
   }
  gotoUsedcars(){this.router.navigate(['usedcars'],{relativeTo:this.activatedRoute})}
  gotoNewcars(){this.router.navigate(['newcars'],{relativeTo:this.activatedRoute})}
  gotoexplorcars(){this.router.navigate(['explorecars'],{relativeTo:this.activatedRoute})}
  }


