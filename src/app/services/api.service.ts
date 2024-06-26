import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getReposOfUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`)
  }

  getPagesOfUser(githubUsername: string, pageNumber: number, noOfPages: number) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?page=${pageNumber}&per_page=${noOfPages}`)
  }


  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
