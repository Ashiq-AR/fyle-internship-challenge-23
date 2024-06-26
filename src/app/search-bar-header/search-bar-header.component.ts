import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { SessionStorageService } from '../services/sessionStorage.service';

@Component({
  selector: 'app-search-bar-header',
  templateUrl: './search-bar-header.component.html',
  styleUrls: ['./search-bar-header.component.scss']
})
export class SearchBarHeaderComponent implements OnInit {
  username!: string
  @Output() isFirstSearched = new EventEmitter();
  @ViewChild('searchButton') searchButton!: any

  constructor(public userService: UserService, private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.username = this.sessionStorageService.getFromSessionStorage('githubUser').login ?? 'johnpapa'
    this.getUserDetails()
    // this.userService.updateCurrentUserRepos(this.username)
    // const clickEvent = new Event('click')
    // console.log(this.searchButton._elementRef.nativeElement.click());
    // this.searchButton._elementRef.dispatchEvent(clickEvent)
  }

  getUserDetails(): void {
    this.isFirstSearched.emit()
    if(Object.values(this.sessionStorageService.getFromSessionStorage("githubUser")).length==0 || this.username != this.sessionStorageService.getFromSessionStorage("githubUser").login){
      this.userService.updateUserDetails(this.username)
      this.userService.updateCurrentUserRepos(this.username)
      // this.sessionStorageService.removeFromSessionStorage("githubUser")
      // this.sessionStorageService.removeFromSessionStorage("githubUserRepos")
      this.sessionStorageService.setUserDetailsToSessionStorage("githubUser")
      this.sessionStorageService.setUserDetailsToSessionStorage("githubUserRepos")
    }
    else{
      this.userService.currentUser.next(this.sessionStorageService.getFromSessionStorage("githubUser"))
      this.userService.currentUserRepos.next(this.sessionStorageService.getFromSessionStorage("githubUserRepos"))
      console.log('from session storage');
    }
    
    console.log(this.userService.currentUser);
  }
}
