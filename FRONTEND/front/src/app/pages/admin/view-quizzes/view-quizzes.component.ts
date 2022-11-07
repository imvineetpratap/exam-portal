import  Swal  from 'sweetalert2';
import { QuizzesService } from './../../../services/quizzes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: 23,
      title: 'JAVA BASICS',
      description: 'this quiz contains questions of java and oops',
      maxMarks: '150',
      numberOfQuestion: '20',
      category:{
        title:'cat title',
        description:'',
      }
    },
    {
      qid: 23,
      title: 'JAVA',
      description: 'this quiz contains questions of java and oops',
      maxMarks: '150',
      numberOfQuestion: '20',
      category:{
        title:'cat title',
        description:'',
      }
    },
  ];
  constructor(private _quiz:QuizzesService) {}


  deleteQuiz(qid){
    // console.log('working');
    // console.log(qid);

    Swal.fire({
      icon:'info',
      title:'are you sure?',
      confirmButtonText:'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showCancelButton:true,
    }).then((result)=>{
if(result.isConfirmed)
{
  //delete


  this._quiz.deleteQuiz(qid).subscribe(
    (data:any)=>{
      //filtering deleted quizes
    this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid)
    Swal.fire('Success!!','Quiz Deleted Sucessfully','success')
    },
    (error)=>{
      Swal.fire('Error!!','Error in deleting quiz','error')
    }

    )
}

    })

  }



  ngOnInit() {
    this._quiz.quizzes().subscribe(
(data:any)=>{
  this.quizzes=data;
  console.log(data);
},

(error)=>{
  console.log(error);
  Swal.fire('Error!!',"Error in loading data",'error');

},
    )
  }
}
