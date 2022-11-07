import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizzesService,
    private snack: MatSnackBar,
    private _cat: CategoryService,
    private _router: Router
  ) {}
  qid = 0;
  categoriests = [];
  quiz;

  updateQuiz() {
    // console.log("working");

    if (
      this.quiz.title.trim() == '' ||
      this.quiz.description == '' ||
      this.quiz.maxMarks == '' ||
      this.quiz.numberOfQuestion == '' ||
      this.quiz.category.cid == ''
    ) {
      this.snack.open('please fill all the details', '', { duration: 3000 });
      return;
    }

    //calling server for adding quiz
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Sucsess!!', 'Quiz updated sucessfully', 'success').then(
          (e) => {
            this._router.navigate(['/admin/quizzes']);
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
    //for getting quiz
    //['qId']:yeh id le kar aya h url se
    this.qid = this._route.snapshot.params['qId'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(data);
        //categories loding function
        this._cat.categories().subscribe(
          (data: any) => {
            //categories loded
            this.categoriests = data;
            console.log(this.categoriests);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in loading date', 'error');
            this.snack.open('error', '', { duration: 3000 });
          }
        );
      },
      (error) => {
        console.log(error);
        this.snack.open('something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }
}
