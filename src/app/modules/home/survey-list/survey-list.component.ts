import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/core/models/survey.model';
import { DataService } from 'src/app/core/services/data.service';
import { SurveyService } from 'src/app/core/services/survey/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  public surveysPerPage = 4;
  public selectedPage = 1;
  public surveysData!: Survey[];

  constructor(
    private repository: SurveyService,
    private restDataSource: DataService
  ) {}

  ngOnInit(): void {
    this.restDataSource.getActiveSurveys().subscribe((data) => {
      
      this.surveysData = data.data.sort((a: any, b: any) =>
        new Date(b.dateExpire as string).getTime() <
        new Date(a.dateExpire as string).getTime()
          ? 1
          : -1
      );
    });
    // this.repository.initializeSurveys();
  }

  // returns active surveys
  get surveys(): Survey[]
  {
    // for pagination
    const pageIndex = (this.selectedPage - 1) * this.surveysPerPage;
    // sort by by closing date
    const surveysTOReturn = this.surveysData;

    return surveysTOReturn?.slice(pageIndex, pageIndex + this.surveysPerPage);
  }

  changePage(newPage: number): void {
    this.selectedPage = newPage;
  }

  changePageSize(event: any): void {
    let newSize = (event.target as HTMLInputElement).value;
    this.surveysPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(
      this.surveysData?.length / this.surveysPerPage
    );
  }
}
