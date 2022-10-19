import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user=null;

  constructor(public login:LoginService) { }

 
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser().firstname;
    //receiving subject from login component that used logged in
    
    
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();      
    this.user=this.login.getUser().firstname;
    });
  }

  public logout(){
    // console.log("working");
    this.login.logout();
    // this.isLoggedIn=false;
    // this.user=null;



    
    window.location.reload();



  // this.login.loginStatusSubject.next(false);
  }

}
