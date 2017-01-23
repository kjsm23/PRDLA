/**
 * Created by --- on 1/21/2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Comment } from '../models';


@Injectable()
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
      .post(
        `/photos/${slug}/comments`,
        { comment: { body: payload } }
      ).map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/photos/${slug}/comments`)
      .map(data => data.comments);
  }

  destroy(commentId, photoSlug) {
    return this.apiService
      .delete(`/photos/${photoSlug}/comments/${commentId}`);
  }

}
