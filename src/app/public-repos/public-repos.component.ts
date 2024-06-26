import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-public-repos',
  templateUrl: './public-repos.component.html',
  styleUrls: ['./public-repos.component.scss']
})
export class PublicReposComponent implements OnInit {

  constructor(public userService: UserService) {}

  perPageOpts: number[] = Array(11).fill(1).map((num,i) => i*10).filter((num) => num!=0)
  repos!: any[]
  perPageControl = new FormControl(10)
  noOfPagesArray!: number[]
  selectedPageArrayIndex = 0
  Array(count: number) {
    return Array(count)
  }

  ngOnInit(): void {
    this.updateRepos()
    this.calcNoOfPagination()
    sessionStorage.setItem('session', Math.random().toString())
  }

  calcNoOfPagination() {
    this.userService.currentUser.subscribe((userDetails) => {
      let noOfPages = Math.ceil(userDetails?.public_repos / (this.perPageControl.value ?? 10))
      console.log(noOfPages);
      this.noOfPagesArray = Array(noOfPages+1).fill(1).map((num, i) => num*i).filter((num) => num!=0)
    })
  }

  updateRepos(){
    this.userService.currentUserRepos.subscribe((repos: any[]) => {
      this.repos = repos
    })
  }

  onPageSelect(selectedPage: number) {
    if(this.selectedPageArrayIndex != selectedPage-1){
      this.selectedPageArrayIndex = selectedPage-1;
      this.requestPagesFromApi()
    } 
  }

  requestPagesFromApi() {
    this.userService.currentUser.subscribe((userDetails) => {
      this.userService.updateCurrentUserReposByPages(userDetails.login, this.selectedPageArrayIndex+1, this.perPageControl.value ?? 10)
      this.updateRepos()
    })
  }

  getAndUpdatePagePrevious() {
    if(this.selectedPageArrayIndex > 0){
      this.selectedPageArrayIndex--
      this.requestPagesFromApi()
    } 
  }

  getAndUpdatePageNext() {
    if(this.selectedPageArrayIndex < this.noOfPagesArray.length-1) {
      this.selectedPageArrayIndex++
      this.requestPagesFromApi()
    }
    
  }

}
