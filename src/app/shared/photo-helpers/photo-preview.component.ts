/**
 * Created by --- on 1/21/2017.
 */
import { Component, Input } from '@angular/core';

import { Photo } from '../models';

@Component({
  selector: 'photo-preview',
  templateUrl: './photo-preview.component.html'
})
export class PhotoPreviewComponent {
  @Input() photo: Photo;

  onToggleFavorite(favorited: boolean) {
    this.photo['favorited'] = favorited;

    if (favorited) {
      this.photo['favoritesCount']++;
    } else {
      this.photo['favoritesCount']--;
    }
  }
}
