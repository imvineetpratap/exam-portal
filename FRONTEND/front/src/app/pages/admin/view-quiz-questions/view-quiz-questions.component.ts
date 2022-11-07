import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid;
  qtitle;
  questions = [];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}
  deleteQuestion(quesId){
    console.log(quesId);
    Swal.fire({
      icon:'info',
      title:'are you sure?',
      confirmButtonText:'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showCancelButton:true,
    }).then((result)=>{

this._question.deleteQuestionofQuiz(quesId).subscribe(

  (data)=>{
    this.questions=this.questions.filter((question)=>question.quesId!=quesId)
    Swal.fire('Success!!','Question Deleted Sucessfully','success');
  },
  (error)=>{
    Swal.fire('Error!!','Error in deleting question','error')
  }
)






    })
  }
  ngOnInit(): void {
    this.qid = this._route.snapshot.params['id'];
    this.qtitle = this._route.snapshot.params['title'];
    //  alert('id: '+this.qid+'title: '+this.qtitle);
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
