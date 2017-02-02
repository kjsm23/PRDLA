/**
 * Created by --- on 1/24/2017.
 */
import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';



//const URL = '/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'file-upload-section',
  templateUrl: './file-upload-section.html'
})
export class FileUploadSectionComponent {
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/api/users/upload'});
}
