import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  quizTitle;
  questionIdhere;
  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private snackbar: MatSnackBar,
    private _router: Router
  ) {}
  question;
  public Editor = ClassicEditor;

  updateQuestionForm() {
    //calling server for adding quiz
    // console.log(this.question);
    this._questionService.updateQuestionToQuiz(this.question).subscribe(

      (data) => {
        Swal.fire('Sucsess!!', 'Question updated sucessfully', 'success').then(
          (e) => {
            this._router.navigate(
              // ['/admin/view-questions/'+this.question.quiz.qid]
              [
                '/admin/view-questions/' +
                  this.question.quiz.qid +
                  '/' +
                  this.question.quiz.title,
              ]
              // ["'/admin/view-questions/'+this.question.quiz.qid"]
            );
          }
        );
        // this.quiz=null;
      },
      (error) => {
        console.log(error);
        Swal.fire('opps!!', 'internal server error', 'error');
      }
    );
  }

  ngOnInit(): void {
    this.quizTitle = this._route.snapshot.params['quizTitle'];
    this.questionIdhere = this._route.snapshot.params['questionId'];
   //fetching question on the basis of its id
    this._questionService
      .getSingleQuestionofQuiz(this.questionIdhere)
      .subscribe(
        (data) => {
          console.log(data);
          //setting up data recived from backend and set quesid too so that we can update it
          this.question = data;
        },
        (error) => {
          this.snackbar.open(
            'Unable to fetch details of questions  !! try again after some time',
            '',
            {
              duration: 3000,
            }
          );
        }
      );
  }
}
