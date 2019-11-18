import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from "../services/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  userObj: any;
  constructor(
    public formBuilder: FormBuilder,
    public api: CommonService,
    public router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [''],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      let credential = {
        username: this.form.value.username,
        password: this.form.value.password,

      };
      this.api.login(credential).subscribe((data: any) => {
        if(data && data.meta.status === 1){
          this.userObj = {
            id: data.data._id,
            username: data.data.username,
            remember_me: this.form.value.remember_me == true ? true: false
          }
          localStorage.setItem('Authorized_user', JSON.stringify(this.userObj));
          localStorage.setItem('user_token', JSON.stringify(data.extra));
          this.router.navigate(['/']);
        }
      })
    }
  }
}
