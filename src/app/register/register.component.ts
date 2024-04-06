import { UserGroup } from './../../models/Users';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isShowRegisterComp: boolean = false;
  submitted: boolean = false;
  form: FormGroup;
  userGroup: UserGroup[];
  continueQuiz: boolean = false;
  isUserDup: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserGroup().subscribe((userGroupRes) => {
      this.userGroup = userGroupRes;
    });

    this.form = this.formBuilder.group({
      userGroupId: [0, Validators.min(0)],
      name: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  registerButtonClick() {
    this.isShowRegisterComp = true;
  }

  backButtonClick() {
    this.isShowRegisterComp = false;
    this.continueQuiz = false;
    this.submitted = false;
  }

  continueQuizClick() {
    this.isShowRegisterComp = true;
    this.continueQuiz = true;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.continueQuiz) {
      const formData = this.form.value;
      this.userService.getUserId(formData.name).subscribe((userId) => {
        this.router.navigate(['/quiz', userId, true]);
      });
    } else {
      this.userService.registerUser(this.form.value).subscribe(
        (userId) => {
          this.router.navigate(['/quiz', userId, false]);
        },
        (error) => {
          if (error.status === 500) {
            this.isUserDup = true;
            console.error('Registration failed:', error.error);
          }
        }
      );
    }
  }
}
