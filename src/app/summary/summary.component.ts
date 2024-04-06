import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummaryViewModel } from 'src/models/Quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  userId: number;
  summaryVm: SummaryViewModel;
  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];
      this.quizService.getUserQuizSummary(this.userId).subscribe((data) => {
        console.log(this.summaryVm);
        this.summaryVm = data;
      })
    })
  }
}
