/**
 * Created by --- on 3/3/2017.
 */
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'facebook',
  templateUrl: 'facebook-button.component.html'

})
export class FacebookButtonComponent implements OnInit {
//vars used only for example, put anything you want :)
  public repoUrl:string;
  public imageUrl:string;

  constructor() { }

  ngOnInit() {
//do something OnInit
  }

}
