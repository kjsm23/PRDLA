/**
 * Created by --- on 1/16/2017.
 */
import { Component,OnInit} from '@angular/core';
import {User} from '../models';
import {UserService} from "../services/user.service";


@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(
    private userService:UserService
  ){}

  currentUser: User;

    ngOnInit(){
      this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
        }
      )
    }
}

