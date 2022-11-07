import { QuizzesService } from './../../../services/quizzes.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
//variable for submitting quiz
public quiz={
 title:"",
   description:"",
     maxMarks:"",
     numberOfQuestion:"",
     active:true,
     category:
     {
      cid:"",

     }
}

  //categories array
  categoriests=[
    //dummy data
    // {
    //   cid:23,
    //   title:"snbvty",
    //   desciption:"wf"
    // },
    // {
    //   cid:23,
    //   title:"snbvty",
    //   desciption:"wf"
    // },
  ]




  constructor(private _cat:CategoryService,private snack: MatSnackBar,private _quizData:QuizzesService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
     //categories loded
      this.categoriests=data;
      console.log(this.categoriests);
    },
    (error)=>{
      console.log(error);
       Swal.fire("Error !!","Error in loading date",'error');
      this.snack.open('error', '', { duration: 3000, });
    })
  }


  addQuiz(){
    // console.log("working");
// console.log(this.quiz);
if(this.quiz.title.trim()==''||this.quiz.description==''|| this.quiz.maxMarks==''||this.quiz.numberOfQuestion==''||this.quiz.category.cid==''){
this.snack.open('please fill all the details', '',{duration:3000});
return;
}

//calling server for adding quiz
this._quizData.addQuiz(this.quiz).subscribe(
(data)=>{
Swal.fire("Sucsess!!", "Quiz added sucessfully",'success');
this.quiz=null;

},
(error)=>{

  console.log(error);
  Swal.fire("opps!!", "internal server error",'error');
}


)

      }


}
