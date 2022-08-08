import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;
  errors: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators],
      password_confirmation: ['', Validators.required]
    });
  }

  submit(){
    const formData = this.form.getRawValue();
    this.authService.register(formData).subscribe(
      (res) => {
          alert(res.message);
          this.router.navigateByUrl('/login');
      },
      (err) => {
        this.errors = err.error.message;
      }
    )
  }

}
