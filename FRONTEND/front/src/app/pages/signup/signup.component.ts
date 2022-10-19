import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  constructor(private userService:UserService,private snack:MatSnackBar) { }




  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  }
  ngOnInit(): void {
  }
  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.password == '' || this.user.firstname == '' || this.user.lastname == '' || this.user.email == '' || this.user.phone == '') {
      this.snack.open("Please fill all the required details",'',{
        duration:2000,
        // verticalPosition:'top',
        // horizontalPosition:'right',

      });
  
      return;
    }

    //add user:userService
this.userService.addUser(this.user).subscribe(
(data:any)=>{
  //success
  console.log(data);
  Swal.fire('Success','user is registered,your user name is '+data.username,'success');
  // alert('success');
  
},
(error)=>{
  //error
  console.log(error);
  // alert('something went wrong');
  this.snack.open("user with this name already exist",'',{
    duration:2000,
    // verticalPosition:'top',
    // horizontalPosition:'right',

  });

  
}



)
  }
}
