import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private _http:HttpClient) { }


  //get all quizzes
  public quizzes()
  {
    return this._http.get(`${baseUrl}/quiz/`);
  }

// add quiz
  public addQuiz(quiz)
  {
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  // delete quiz
  public deleteQuiz(qid)
  {
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get single quiz
  public getQuiz(qid)
  {
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update quiz

  public updateQuiz(quiz)
  {
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }
//get all quizzes of category
public getQuizzesOfCategory(cid)
{
  return this._http.get(`${baseUrl}/quiz/category/${cid}`);
}


//get all active quizzes of category
public getActiveQuizzesOfCategory(cid){
  return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
}

//get all active quizzes
public getAllActiveQuizzes(){
  return this._http.get(`${baseUrl}/quiz/active/`);
}
}
