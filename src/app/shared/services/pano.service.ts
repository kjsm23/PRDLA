/**
 * Created by --- on 1/21/2017.
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Pano } from '../models';

@Injectable()
export class PanoService {
  constructor (
    private apiService: ApiService
  ) {}


  save(pano):Observable<Pano>{
    return this.apiService.post('/pano', {pano: pano})
      .map(data => data.pano);
  }

}
