/**
 * Created by --- on 1/24/2017.
 */
import { Component,Input, Output,EventEmitter  } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'pannellum';
import { Photo, PhotosService, UserService,  User } from '../../shared';
import featureGroup = L.featureGroup;
declare const pannellum: any;

@Component({
  selector: 'file-upload-section',
  templateUrl: './file-upload-section.html',
  styleUrls: ['./file-upload-section.css']

})

export class FileUploadSectionComponent  {

  @Output() cpano = new EventEmitter();
constructor(
    private photosService: PhotosService,
    private router: Router,
    private userService: UserService
  ) {

}
  photo: Photo;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

public uploader:FileUploader;
  ngOnInit() {
 // Load the current user's data
	    this.userService.currentUser.subscribe(
	      (userData: User) => {
	        this.currentUser = userData;

	        this.canModify = true;
	      }
	    );
	    console.log("This user");
      console.log( this.currentUser );
      this.uploader = new FileUploader({url:'http://localhost:3000/api/users/upload', authTokenHeader:"Authorization", authToken:"Token " +  this.currentUser.token});

       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {

            console.log("Json parse Response");
            console.log( JSON.parse(response));
            var responseJson = JSON.parse(response);
            let panoPath = 'http://localhost:3000/' + responseJson.panoInfo.user + '/' + responseJson.panoInfo.filename;


         this.cpano.emit(panoPath);

         pannellum.viewer('panorama', {
           "type": "equirectangular",
           "panorama": panoPath,
           "autoLoad": true
         });

        };
	}

}
