/**
 * Created by --- on 1/21/2017.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {PhotoListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-photos',
  templateUrl: './profile-photos.component.html'
})
export class ProfilePhotosComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  photosConfig: PhotoListConfig = new PhotoListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.photosConfig.filters.author = this.profile.username;
      }
    );
  }

}
