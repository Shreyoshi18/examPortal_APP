import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users:any
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.users = this.login.getUser()
    console.log(this.users)
    

  }

}
