/**
 * Created by --- on 1/21/2017.
 */
import {Component, Input, OnInit, AfterViewInit} from '@angular/core';

import { Photo } from '../models';

import 'pannellum';
declare const pannellum : any;


@Component({
  selector: 'photo-preview',
  templateUrl: './photo-preview.component.html'
})
export class PhotoPreviewComponent implements AfterViewInit{
  @Input() photo: Photo;

  ngAfterViewInit(){
    pannellum.viewer('panorama',
      {
        "type":"equirectangular",
        "panorama": this.photo.pathPano,
        "autoload": true

      });
  };



  onToggleFavorite(favorited: boolean) {
    this.photo['favorited'] = favorited;

    if (favorited) {
      this.photo['favoritesCount']++;
    } else {
      this.photo['favoritesCount']--;
    }
  }
}
