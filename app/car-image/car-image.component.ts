import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserCarsService } from '../services/user-cars.service';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpProgressEvent } from '@angular/common/http';
import { iICarImages } from '../interfaces/ICarImages';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.scss']
})
export class CarImageComponent implements OnInit {
  srcImages:string="../assets/images/";
  imagesUrls:any[]=["","","",""];
  imagesFiles:File[]=[];
  uploadProgress:number=0;
  uploadMessage:string="";
  posterImage:{fileName:string,srcUrl:any}={fileName:"",srcUrl:""};
  @Output() CarImagesCompleted=new EventEmitter();
  img:string="";
 @Output() isCarSaved = new EventEmitter();

  constructor(private userCarsServices:UserCarsService, private filesService:FilesService) {
   }
  ngOnInit(): void {
  }
  startCarImageProcess(e:any)
  {
    this.handlecarImage(e.target?.files[0])
  }
  startPosterImageProcess(e:any)
  {
    this.handlePosterImage(e.target?.files[0]);
  }

  handlecarImage(file:File)
  {
    this.addFile(file,false); 
    console.log(this.imagesFiles);
    this.getImageUrl(file).then((Url)=>{
      for(let i=0; i<this.imagesUrls.length; i++)
      {
        if(this.imagesUrls[i]=="")
          {
            this.imagesUrls[i]=Url;
            this.completedImages(true);
            break;
          }
      }
    })
    
  }
  handlePosterImage(file:File)
  {
    this.addFile(file,true);
    this.filesService.getImageUrl(file).then((url=>{
      this.posterImage={fileName:file.name,srcUrl:url};
      this.completedImages(true);

    }))
  }

  addFile(file:File,isPoster:boolean)
  {
    if(isPoster)
    {
      this.imagesFiles[0]=file;
      return;
    }
     
    
    if(this.imagesFiles.length<3)
    this.imagesFiles.push(file);
 else
    {
     this.imagesFiles[3]=file;
    }   
  }
  getImageUrl(file:File)
  {
    return new Promise((resolve,reject)=>{
      let reader=new FileReader();
      reader.readAsDataURL(file);
     
      reader.onload=(e)=>{
          if(e.target?.result)
            resolve(e.target?.result);
           else
            reject("error while  creating url"); 
           }});
  }
  getImageUrlBinary(file:File)
  {
    return new Promise((resolve,reject)=>{
      let reader=new FileReader();
      reader.readAsBinaryString(file);
    
      reader.onload=(e)=>{
          if(e.target?.result)
            resolve(e.target?.result);
           else
            reject("error while  creating url"); 
           }});
  } 
  completedImages(state:boolean)
  {
    this.CarImagesCompleted.emit(state);
  }

 uploadImages(files:File[],carId:number)
 {
  if(!files)
  
    alert("files is empty");
   console.log(files); 
   this.filesService.uploadFiles(files,"usersCars")?.subscribe(
    (event)=>
    {
      if(event.type===HttpEventType.UploadProgress   && event.total!=null)
        this.uploadProgress=Math.round(100 * event.loaded / event.total);
      else if(event.type===HttpEventType.Response)
      {

        let carImages:iICarImages={car_ID:carId,car_Images:this.getFilesNames(files)};
        console.log(carImages);
        this.userCarsServices.addCarImagesStrings(carImages).subscribe(
          imagesIDs=>
          {
            console.log(imagesIDs);
            this.uploadMessage=`upload images succeeded `;
            this.isCarSaved.emit(true);

          },
          err=>alert(err)
        )
      
        
      }
    },
    error=>alert(error)
  )
 }

 getFilesNames(files:File[])
 {
  let filesNames:string[]=[];
  for(let file of files)
  {
    filesNames.push(file.name)
  }
  return filesNames;

 }
 getPoster()
 {
  return this.posterImage;
 }
  uploadImageSuccess() {
    this.isCarSaved.emit(false);
    this.uploadProgress = 0
  }
}
