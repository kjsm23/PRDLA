import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Photo,
  PhotosService,
  Comment,
  CommentsService,
  User,
  UserService
} from '../shared';

@Component({
  selector: 'photo-page',
  templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit {
  photo: Photo;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private photosService: PhotosService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched photo
    this.route.data.subscribe(
      (data: { photo: Photo }) => {
        this.photo = data.photo;

        // Load the comments on this photo
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.photo.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.photo.favorited = favorited;

    if (favorited) {
      this.photo.favoritesCount++;
    } else {
      this.photo.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.photo.author.following = following;
  }

  deletePhoto() {
    this.isDeleting = true;

    this.photosService.destroy(this.photo.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.photo.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    let commentBody = this.commentControl.value;
    this.commentsService
      .add(this.photo.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.photo.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}