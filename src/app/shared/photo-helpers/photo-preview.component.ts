/**
 * Created by --- on 1/21/2017.
 */
import {Component, Input, AfterViewInit} from '@angular/core';

import { Photo } from '../models';

import 'pannellum';
declare const pannellum : any;


@Component({
  selector: 'photo-preview',
  templateUrl: './photo-preview.component.html'
})
export class PhotoPreviewComponent implements AfterViewInit{
  @Input() photo: Photo;
  @Input() ind: any;
  panoIn : any;


  ngAfterViewInit(){

    this.panoIn = pannellum.viewer(this.ind,
      {
        "type":"equirectangular",
        "panorama": this.photo.pathPano,
        "autoLoad": true,
        "hotSpots": this.photo.hotspot
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
