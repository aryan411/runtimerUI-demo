import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public surveysPerPage = 4;
  public selectedPage = 1;


  constructor(private repository: SurveyService) { }

  ngOnInit(): void {
    this.repository.initializeSurveys();
  }

  // returns active surveys
  get surveys(): Survey[]
  {
    // for pagination
    const pageIndex = (this.selectedPage - 1) * this.surveysPerPage;

    // sort by by closing date
    const surveysTOReturn = this.repository.getActiveSurveys().sort((a, b) =>
      ((new Date(b.dateExpire as string)).getTime() < (new Date (a.dateExpire as string)).getTime()) ? 1 : -1
    );

    return surveysTOReturn.slice(pageIndex, pageIndex + this.surveysPerPage);
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(event:any): void
  {
    let newSize = (event.target as HTMLInputElement).value
    this.surveysPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getActiveSurveys().length / this.surveysPerPage);
  }
}
