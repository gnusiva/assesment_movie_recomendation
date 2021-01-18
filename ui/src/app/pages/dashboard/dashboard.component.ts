import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = true;
  recentMovies = [];
  allMovies = [];
  recommendedMovies = [];
  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    if ( !localStorage.getItem('token')) { this.router.navigate(['/login']); }
    this.apiService.getRecentMovies().subscribe( (data: any) => {
      this.isLoading = false;
      if ( data ) {
        this.recentMovies = data;
      }
    });
    this.apiService.getAllMovies().subscribe( (data: any) => {
      this.isLoading = false;
      if ( data ) {
        this.allMovies = data;
      }
    });
    this.apiService.getRecommendedMovies().subscribe( (data: any) => {
      this.isLoading = false;
      if ( data ) {
        this.recommendedMovies = data;
      }
    })
  }

  setRecentMovie(movie): void {
    this.apiService.setRecentMovie(movie).subscribe( data => {
      window.location.reload();
    });
  }

  clearRecentMovies(): void {
    this.apiService.clearRecentMovies().subscribe( data => {
      window.location.reload();
    })
  }

}
