import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('f') loginForm!: NgForm;

  isLoginMode = true;
  displayError = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSwithMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponse>;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.login(email, password);
      authObs = this.authService.login(email, password);
    } else {
      // authObs = this.signup(email, password);
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.displayError = errorMessage;
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }

  // login(email: string, password: string) {
  //   this.isLoading = true;
  //   return this.authService.login(email, password);
  // }

  // signup(email: string, password: string) {
  //   this.isLoading = true;
  //   return this.authService.signup(email, password);
  // }

  onCloseHandleError() {
    this.displayError = null;
  }
}
