import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isLoading = false;
  isError = false;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    if ( localStorage.getItem('token')) { this.router.navigate(['/dashboard']); }
  }

  login(): void {
    this.isLoading = true;
    this.isError = false;
    this.apiService.login(this.username, this.password).subscribe(
      (token: any) => {
        this.isLoading = false;
        localStorage.setItem('token', token.token);
        this.router.navigate(['/dashboard']);
      }, 
      error => {
        this.isLoading = false;
        this.isError = true;
      }
    );
    console.log( this.username, this.password)
  }

}
