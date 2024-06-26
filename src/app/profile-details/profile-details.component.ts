import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  constructor (public userService: UserService) {}
  isUserLoading!: boolean

  ngOnInit(): void {
    this.isUserLoading = this.userService.isUserLoading
  }

}
