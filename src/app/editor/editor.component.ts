/**
 * Created by --- on 1/22/2017.
 */
import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo, PhotosService,Pano,PanoService } from '../shared';
import{FileUploadSectionComponent} from './file-upload/file-upload-section';


@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  photo: Photo = new Photo();
  photoForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private panoService: PanoService
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

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updatePhoto(this.photoForm.value);



    // post the changes
    this.photosService
      .save({
        title: 'Esto es un titulo',
        description: 'Esto es una desc';
        path: FileUploadSectionComponent.panoPath ;
        lat: ;
        log: ;
        hotspot: [{Glon: 3.50 , Glat: 3.50}];
        transition: ;
        author: ;})
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
