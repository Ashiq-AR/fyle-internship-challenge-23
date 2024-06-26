import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isNotEvenSearched!: boolean
  constructor(
    private apiService: ApiService,
    public userService: UserService
  ) {}

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
