import {Component, OnInit} from '@angular/core';
import {AccountService} from '../core/services/account.service';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  model: any = {};
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    console.log(this.form, 'vvv');

    return this.form.controls;
  }

  onSubmit() {
    // Here you would implement your signup logic
    console.log('Signup', this.model);
    this.submitted = true;
    // stop here if form is invalid

    this.loading = true;
    this.accountService
      .register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: error => {
          this.loading = false;
        },
      });
  }
}
