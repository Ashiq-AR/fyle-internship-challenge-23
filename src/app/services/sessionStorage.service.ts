import { Injectable } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })

export class SessionStorageService {

    constructor(private userService: UserService) {}

    getFromSessionStorage(key: string) {
        this.userService.isUserLoading = false
        this.userService.isReposLoading = false
        return JSON.parse(sessionStorage.getItem(key) ?? '{}')
    }

    setUserDetailsToSessionStorage(key: string) {
        console.log('set repo to localstorage');
        switch(key){
            case "githubUser" :
                this.userService.currentUser.subscribe((userDetails) => {
                    sessionStorage.setItem(key, JSON.stringify(userDetails))
                })
            break
            case "githubUserRepos":
                this.userService.currentUserRepos.subscribe((repoDetails) => {
                    sessionStorage.setItem(key, JSON.stringify(repoDetails))
                })
                
            break
        }
        setTimeout(()=>{
            sessionStorage.removeItem(key)
        }, 3600*1000)
    }

    removeFromSessionStorage = (key: string) => sessionStorage.removeItem(key)
}