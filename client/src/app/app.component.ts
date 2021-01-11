import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_model/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The dating app';
  users: any; //any = équivalent de var en C#

  constructor(private accountService: AccountService) {

  }

  //: void pourrait être enlevé
  ngOnInit(): void {
    this.setCurrentUser();
  }
  
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}

