/**
 * Created by --- on 1/22/2017.*/

import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 import {FileUploadSectionComponent} from './file-upload/file-upload-section';
import { Photo, PhotosService } from '../shared';
import {LeafletMapComponent} from '../shared/leaflet-map/leaflet-map.component';
import{currentLocPano} from '../shared/leaflet-map/leaflet-map.component';



@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  //@Input() currentLocPano;

  photo: Photo = new Photo();
  photoForm: FormGroup;
  currentPano: Object = {};
//  currentLocPano: string;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,

  ) {

    // use the FormBuilder to create a form group
    this.photoForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });
    // Optional: subscribe to value changes on the form
    // this.photoForm.valueChanges.subscribe(value => this.updatePhoto(value));
  }
  handlePanoUpdated(panoramaChanged) {
    // Handle the event
    this.currentPano= {panoPath:  panoramaChanged};
    console.log('evento:' + panoramaChanged);

  }

  /*
  handleLocPanoUpdated(panoLocChanged) {
    // Handle the event
    console.log('evento:' + panoLocChanged);
    this.currentLocPano = panoLocChanged;
    console.log('evento:' + panoLocChanged);

  }*/
  ngOnInit() {
    // If there's an photo prefetched, load it
    this.route.data.subscribe(
      (data: {photo: Photo}) => {
        if (data.photo) {
          this.photo = data.photo;
          this.photoForm.patchValue(data.photo);
        }
      }
    );
  }

  /*
  addTag() {
    // retrieve tag control
    let tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.photo.tagList.indexOf(tag) < 0) {
      this.photo.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.photo.tagList = this.photo.tagList.filter((tag) => tag !== tagName);
  }*/

  submitForm(){
    this.isSubmitting = true;
    //console.log( currentPano );
    // update the model
    this.updatePhoto(this.photoForm.value);

    //console.log(this.currentPano);

    // post the changes
    console.log(this.currentPano);
    console.log(currentLocPano);
      this.currentPano = { panoPath:  this.currentPano, locationMap:  currentLocPano , title: this.photo.title , description: this.photo.description};


    console.log('Current Pano',this.currentPano);

    this.photosService
      .save(this.currentPano)

      .subscribe(
        photo => this.router.navigateByUrl('/photo/' + photo.slug),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updatePhoto(values: Object) {
    (<any>Object).assign(this.photo, values);
  }
}
