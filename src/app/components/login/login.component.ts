import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userObj: any = {
    userName: '',
    password: ''
  };

  router = inject(Router);
  http = inject(HttpClient);

  onLogin() {
    this.http.post('http://localhost:3001/api/login', this.userObj).subscribe((res: any) => {
      if (res.token) {
        alert('Login Success');
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('add-emp');
      } else {
        alert(res.error || 'Login failed');
      }
    }, (error) => {
      alert('An error occurred during login');
    });
  }

}
