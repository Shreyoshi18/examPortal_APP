import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = {
    username:'',
    password:''
  }
  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    console.log(this.loginDetails)
    if(this.loginDetails.password == '' || this.loginDetails.password == null)
    {
      this.snack.open('Password is required','',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
      return
    }

    if(this.loginDetails.username == '' || this.loginDetails.username == null)
    {
      this.snack.open('Username is required','',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
      return
    }

    //generate-token
    this.loginService.generateToken(this.loginDetails).subscribe(
      (data:any)=>{
        console.log(data);
        this.loginService.setToken(data.token);

        this.loginService.getCurrentUser().subscribe(
          
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);

            //redirect :admin dashboard
            //redirect :user dashboard
            if(this.loginService.getUserRole() == 'Normal')
            {
              this.router.navigate(['user-dashboard'])
            }
            else if(this.loginService.getUserRole() == 'Admin')
            {
             // window.location.href = '/admin-dashboard' . Reloads the components
             this.router.navigate(['admin-dashboard'])
            }
          }
        )

      },

      (error)=>{
        console.log('Error!!')
        console.log(error)
        this.snack.open('Invalid Details. Please provide valid details.', '',{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )

  }
}
