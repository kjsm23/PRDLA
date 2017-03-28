/**
 * Created by --- on 3/26/2017.
 */
import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../../shared';


@Component({
  selector: 'forgot-page',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting:boolean = false;
  authForm2: FormGroup;
  questions: string[] = ["In what city were you born?","What is your favorite color?","What is your favorite movie?"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb:FormBuilder
  ){
    // use FormBuilder to create a form group
    this.authForm2 = this.fb.group({
      'email1': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      if (this.authType === 'forgot') {
        this.authForm2.addControl('fquestion1', new FormControl());
        this.authForm2.addControl('fquestion2', new FormControl());
        this.authForm2.addControl('fquestion3', new FormControl());
      }
    });
  }

  submitForm2() {
    this.isSubmitting = true;
    this.errors = new Errors();

    let credentials = this.authForm2.value;
    this.userService
      .attemptForgot(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
}
