/**
 * Created by --- on 1/21/2017.
 */
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Photo, PhotosService, UserService } from '../shared';

@Injectable()
export class PhotoResolver implements Resolve<Photo> {
  constructor(
    private photosService: PhotosService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.photosService.get(route.params['slug'])
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
