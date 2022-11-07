import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // public loginStatusSubject=new Subject<boolean>();

  loginData = {
    username: '',
    password: '',
  }
  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) { }
  formSubmit() {
    // console.log("working");

    // console.log(this.loginData);
    if (this.loginData.username.trim() == '') {
      this.snack.open('Username is required', '', { duration: 3000, });
      return;
    }
    if (this.loginData.password.trim() == '') {
      this.snack.open('Password is required', '', { duration: 3000, });
      return;
    }
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("sucessfully login");
        this.snack.open('Sucessfully login', '', { duration: 3000, });
        //login user and set token in local...
        this.login.loginUser(data.token);
        //getting current user details
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            //redirect ...admin:--admin dashboard
            //redirect ...user:--user dashboard
            if(this.login.getUserRole()=="Admin")
            {
              //redirect to admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }

            else if(this.login.getUserRole()=="Normal"){
              //redirect to user dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/loadquiz/0']);
              // this.router.navigate(['user-dashboard/user-profile']);
              this.login.loginStatusSubject.next(true);
            }
            else{
              this.login.logout();
              location.reload();
            }

          }
        );
      },


      //error message if error
      (error) => {
        console.log('error');
        console.log(error);
this.snack.open("invalid details  !! try again",'',{
  duration:3000,
});

      }
    )
  }
  ngOnInit(): void {
  }

}
