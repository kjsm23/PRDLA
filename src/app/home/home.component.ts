/**
 * Created by --- on 1/17/2017.
 */
import { Component,OnInit} from '@angular/core';
import  {Router} from '@angular/router';

import {PhotoListConfig,UserService} from '../shared';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    //private tagsService: TagsService,
    private userService: UserService

  ){}

  isAuthenticated:boolean;
  listConfig: PhotoListConfig = new PhotoListConfig();
 // tags: Array<string> = [];
 // tagsLoaded: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the panorama list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );
/*
    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });*/
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type:type, filters:filters};
  }
}
