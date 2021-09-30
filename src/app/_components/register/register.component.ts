import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService) { }

  public registerForm: FormGroup;

  ngOnInit() {
    localStorage.clear();
    this.authenticationService.logout();
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(35)]),
      userId: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      () => {
        swal('','User Registered successfully!!','success');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error.message, 'Error');
      }
    )
  }

}