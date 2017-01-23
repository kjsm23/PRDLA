/**
 * Created by --- on 1/21/2017.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Photo} from '../models';
import { PhotosService, UserService } from '../services';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private photosService: PhotosService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() photo: Photo;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.photo.favorited) {
          this.photosService.favorite(this.photo.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              },
              err => this.isSubmitting = false
            );

          // Otherwise, unfavorite the article
        } else {
          this.photosService.unfavorite(this.photo.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              },
              err => this.isSubmitting = false
            );
        }

      }
    )


  }

}
