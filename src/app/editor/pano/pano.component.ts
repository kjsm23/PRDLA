
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

<<<<<<< HEAD:src/app/editor/pano/pano.component.ts
  	// let panoPath = 'http://localhost:3000/jorge/file-jorge-1486160256329.jpg'
    //
    // pannellum.viewer('panorama', {
    //   "type": "equirectangular",
    //   "panorama": panoPath
    // });
=======

  	let panoPath = 'http://localhost:3000/jorge/file-jorge-1486160256329.jpg'

    pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": panoPath

    });
>>>>>>> origin/georgy_code:src/app/photo/pano/pano.component.ts
  }
  

}

<<<<<<< HEAD:src/app/editor/pano/pano.component.ts
}
=======
>>>>>>> origin/georgy_code:src/app/photo/pano/pano.component.ts
