import { Injectable } from '@angular/core';
import { ApiLinksService } from './api-links.service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private ApILinks: ApiLinksService, private http: HttpClient) { }
  uploadFiles = (files: File[], folderName: string) => {

    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const formData = new FormData();
    // formData.append('file', files[0], files[0].name);

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });
    console.log(formData);

    return this.http.post(this.ApILinks.uploadFiles, formData, { reportProgress: true, observe: 'events', params: { folderName: folderName } }).pipe(
      catchError((err) => {
        return throwError(() => err.message);
      })
    )
  }


  getFile(fileName: string, folderName: string) {
    return this.http.get(this.ApILinks.serveFile,
      { params: { fileName: fileName, folderName: folderName }, responseType: 'blob' }).pipe(
        catchError((err) => {
          return throwError(() => err.message);
        })
      )
  }


  //  getFiles(filesNames:string[],folderName:string): Observable<Blob[]>
  //  {

  //   for(let fileName in filesNames)
  //   {


  //   }
  //   // return this.http.post<Blob[]>(this.ApILinks.serveFiles,filesNames,{params:{folderName:folderName}}).pipe(
  //   //   catchError((err)=>{
  //   //     return throwError(()=>err.message);
  //   //   })
  //   //)

  //  }
  //  getCarImage()
  //  {

  //    let url:string="http://localhost:5278/api/UploadImages";
  //    return this.http.get("http://localhost:5278/api/UploadImages").pipe(catchError((err)=>{
  //      return throwError(()=> err.message);
  //    }))

  //  }
  async getImagesUrls(files: Blob[]) {
    console.log(files);
    return new Promise((resolve, reject) => {
      let urls: any[] = [];
      console.log("iam there before for loop", files.length);

      for (let file of files) {
        console.log(files);
        this.getImageUrl(file).then(
          url => {
            console.log(url)
            urls.push(url)

          }

        )
      }

      if (urls)
        resolve(urls);
      else
        reject("rejecting from get imgaes urls")


    })
  }



  getImageUrl(file: Blob) {
    let myFile: File;
    if (file instanceof Blob) {
      console.log("hey iam there in if condition")
      myFile = new File([file], 'image.jpg', {
        type: file.type
      })
    }
    console.log("efdfdfdsfs")
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(myFile);
      reader.result

      reader.onload = (e) => {
        if (e.target?.result)
          resolve(e.target?.result as string);
        else
          reject("error while  creating url");
      }
    });
  }

}
