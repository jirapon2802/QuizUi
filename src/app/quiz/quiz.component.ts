import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizViewModel } from 'src/models/Quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit{

  userId: number;
  showError: boolean = false;
  isLoadQuiz: boolean;
  isFinishedQuiz: boolean;
  constructor(private quizService: QuizService,
            private route: ActivatedRoute,
            private router: Router
  ) {}
  
  quizList: QuizViewModel[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.isLoadQuiz = params['loadQuiz'] === 'true';
      if(!this.isLoadQuiz) {
        this.quizService.getQuizList(this.userId).subscribe((quizListRes) => {
          this.quizList = quizListRes;
        })
      } else {
        this.quizService.loadUserQuiz(this.userId).subscribe((quizListRes) => {
          this.quizList = quizListRes;
          if(this.hasAllQuizzesSelected(this.quizList)){
            this.router.navigate(['/summary', this.userId]);
          }
        });
      }
    });
  }

  saveSelectedOption(quizId: number, answerId: number): void{
    const matchingOption = this.quizList.find(x => x.quizId === quizId)?.option.find(option => option.answerId === answerId);
    if (matchingOption) {
      matchingOption.isSelected = true;
    }
  }
  
  submitQuiz() {
    if(this.hasAllQuizzesSelected(this.quizList)) {
      this.showError = false;
      this.quizService.submitUserQuiz(this.userId, this.quizList).subscribe((success) => {
        if(success){
          this.router.navigate(['summary', this.userId]);
        }
      });
    } else {
      this.showError = true;
    }
  }

  saveQuiz() {
    this.showError = false;
    this.quizService.saveUserQuiz(this.userId, this.quizList).subscribe((success) => {
      if(success) {
        this.router.navigate(['register']);
      }
    });
  }

  hasAllQuizzesSelected(quizList: QuizViewModel[]): boolean {
    return quizList.every(quiz => quiz.option.some(option => option.isSelected));
  }
}