import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public category = {
    title: '',
   description: '',
  }
  constructor(private _category:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

 //ad category form data
  Add_New_Category_Data(){
console.log(this.category);
if (this.category.title.trim() == ''||this.category.description ==null) {
  this.snack.open("Please fill all the required details",'',{
    duration:2000,

  });

  return;
  }
    this._category.addcategory(this.category).subscribe(
(data:any)=>{
this.category.title='';
this.category.description='';
console.log(data);
Swal.fire("Sucsess!!", "category added sucessfully",'success');


},
(error)=>{


  console.log(error);
  Swal.fire("opps!!", "internal server error",'error');
}




    )
}
}
