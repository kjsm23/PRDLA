/**
 * Created by --- on 1/21/2017.
 */
import { Component, Input } from '@angular/core';

import { Photo, PhotoListConfig } from '../models';
import { PhotosService } from '../services';
import 'pannellum';
declare const pannellum: any;

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent {

  constructor (
    private photosService: PhotosService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: PhotoListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: PhotoListConfig;
  results: Photo[];
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit || typeof (this.limit) == "number") {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1))
    }

    this.photosService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.photos;



        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        //this.totalPages = Array.from(new Array(Math.ceil(data.photosCount / this.limit)),(val,index)=>index+1);
      });
  }
}
