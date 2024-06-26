import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class UserService {
    currentUser = new BehaviorSubject<any>(null)
    isUserLoading = true
    isReposLoading = true
    currentUserRepos = new ReplaySubject<any>()

    constructor(private apiService: ApiService) {}

    updateUserDetails(githubUsername: string){
        this.apiService.getUser(githubUsername).subscribe({
            next: (userDetails)=>{
                this.isUserLoading = true
                this.currentUser.next(userDetails)
            },
            complete: ()=>{
                setTimeout(() => {
                    this.isUserLoading = false
                }, 2000);
            }
        })
    }

    updateCurrentUserRepos(githubUsername: string) {
        this.apiService.getReposOfUser(githubUsername).subscribe({
            next: (repoDetails)=>{
                this.isReposLoading = true
                this.currentUserRepos.next(repoDetails)
            },
            complete: () => {
                setTimeout(() => this.isReposLoading = false, 2000)
            }
        })
    }

    updateCurrentUserReposByPages(githubUsername: string, pageNumber: number, noOfPages: number): void {
        this.apiService.getPagesOfUser(githubUsername, pageNumber, noOfPages).subscribe({
            next: (pagedRepos) => {
                this.isReposLoading = true
                this.currentUserRepos.next(pagedRepos)
            },
            complete: ()=> setTimeout(() => this.isReposLoading = false, 2000)
        })
    }
}