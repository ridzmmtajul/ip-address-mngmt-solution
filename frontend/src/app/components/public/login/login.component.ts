import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any;
  error!: string;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
  ) { 
    this.form = FormGroup
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    })
  }

  submit() {
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'qvqfY0knPXBl61liNcvu0GozxT4RkXIGTBAVWZa6'
    };

    this.authService.login(data).subscribe(
      (res) => {
        localStorage.setItem('token', res.access_token);     
        this.router.navigateByUrl('/home');
    }, (err) => {      
        this.error = err.error.error_description;
    })
  }

}
