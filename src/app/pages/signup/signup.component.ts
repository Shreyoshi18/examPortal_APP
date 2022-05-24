import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public user:User, private userService:UserService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    console.log(this.user)
    
    this.userService.createUser(this.user).subscribe(
      (data)=>{
        console.log(data)
        this.snack.open('Successfully Registered','Ok',{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
        this.router.navigate(['login'])
      },
      error=>this.snack.open('Something went wrong!!','Dismiss',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    )
  }
}
