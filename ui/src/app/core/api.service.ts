import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post( this.baseUrl + '/login', { username, password });
  }

  getRecentMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + '/recent-movies', httpOptions);
  }

  setRecentMovie(movie) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + '/add-recent-movie', movie, httpOptions);
  }

  clearRecentMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + '/clear-recent-movies', httpOptions);
  }

  getRecommendedMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + '/recommended-movies', httpOptions);
  }

  getAllMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + '/all-movies', httpOptions);
  }

}
