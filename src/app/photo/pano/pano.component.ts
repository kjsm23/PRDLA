/**
 * Created by --- on 2/3/2017.
 */

/**
 * Created by --- on 1/25/2017.
 */
import {Component, OnInit} from "@angular/core";
//import {pannellum} from "pannellum";
//import * as pannellum from 'pannellum';
import 'pannellum';

const pannellum:any = require('pannellum');




@Component({
  selector: "pano",
  template:("./pano.component.html"),
  styleUrls: ['./pano.component.css'],
  providers: []
})
export class PanoComponent implements OnInit  {
  constructor() {
  }

  ngOnInit(){

    pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": "https://pannellum.org/images/alma.jpg"
    });
  }

}
