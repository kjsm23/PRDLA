/**
 * Created by --- on 1/24/2017.
 */
import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Photo, PhotosService, UserService,  User } from '../../shared';


//const URL = '/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'file-upload-section',
  templateUrl: './file-upload-section.html'
})
export class FileUploadSectionComponent  {
constructor(
    private photosService: PhotosService,
    private router: Router,
    private userService: UserService
  ) {}

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
      console.log( this.currentUser );
      this.uploader = new FileUploader({url:'http://localhost:3000/api/users/upload', authTokenHeader:"Authorization", authToken:"Token " + this.currentUser.token});
	}
  	
}
