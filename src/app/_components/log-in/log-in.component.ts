import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public loginForm: FormGroup;

  ngOnInit() {
    localStorage.clear();
    this.authenticationService.logout();
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {

    this.authenticationService.login(this.loginForm.value.userId, this.loginForm.value.password).subscribe(
      () => {
        swal('','Login sucessfully','success');
        this.router.navigate(['/dashboard']);
      },
      error => {
        swal('',error.error.message,'error');
        console.log(error.error.message);
      });
  }

}
