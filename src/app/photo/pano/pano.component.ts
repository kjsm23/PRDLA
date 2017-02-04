
/**
 * Created by --- on 1/25/2017.
 */
import {Component, OnInit} from "@angular/core";


import'pannellum';
declare const pannellum: any;
@Component({
  selector: 'pano',
  templateUrl: './pano.component.html',
  styleUrls: ['./pano.component.css']
})
export class PanoComponent  implements OnInit{
  constructor() {
  }

  ngOnInit(){
    pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": "https://pannellum.org/images/alma.jpg"
    });
  }


}
