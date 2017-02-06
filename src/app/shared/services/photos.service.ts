/**
 * Created by --- on 1/21/2017.
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Photo, PhotoListConfig } from '../models';

@Injectable()
export class PhotosService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: PhotoListConfig): Observable<{photos: Photo[], photosCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    let params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters)
      .forEach((key) => {
        params.set(key, config.filters[key]);
      });

    return this.apiService
      .get(
        '/photos' + ((config.type === 'feed') ? '/feed' : ''),
        params
      ).map(data => data);
  }

  get(slug): Observable<Photo> {
    return this.apiService.get('/photos/' + slug)
      .map(data => data.photo);
  }

  destroy(slug) {
    return this.apiService.delete('/photos/' + slug);
  }

  save(photo): Observable<Photo> {
    // If we're updating an existing photo
    if (photo.slug) {
      return this.apiService.put('/photos/' + photo.slug, {photo: photo})
        .map(data => data.photo);

      // Otherwise, create a new photo
    } else {
      return this.apiService.post('/photos/', {photo: photo})
        .map(data => data.photo);
    }
  }

  favorite(slug): Observable<Photo> {
    return this.apiService.post('/photos/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Photo> {
    return this.apiService.delete('/photos/' + slug + '/favorite');
  }

}
