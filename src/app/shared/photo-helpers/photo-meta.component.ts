/**
 * Created by --- on 1/21/2017.
 */
import { Component, Input } from '@angular/core';

import { Photo } from '../models';

@Component({
  selector: 'photo-meta',
  templateUrl: './photo-meta.component.html'
})
export class PhotoMetaComponent {
  @Input() photo: Photo;
}
