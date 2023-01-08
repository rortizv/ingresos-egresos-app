import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) { return; }
    const { email, password } = this.loginForm.value;
    this.auth.loginUsuario(email, password)
      .then(credenciales => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
      });
  }

}