import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = []; //Initialize it with empty

  constructor(private accountService: AccountService, 
              private toastr: ToastrService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    // this.registerForm = new FormGroup({
    //   //username: new FormControl('Hello'), //With default value
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]) //password is the name of the FormControl to compareTo
    // });

    //With the FormBuilder service
    this.registerForm = this.fb.group({
      gender: ['male'], //Radio button
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]] //password is the name of the FormControl to compareTo
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      //control over here is the control using this function as a custom validator
      //matchTo is the name of the FormControl to compareTo
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMathching: true} //isMatching is a custom name, it need an object as a return value
    };
  }

  register() {
    //console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
