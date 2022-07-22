import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Survey } from '../../models/survey.model';
import { DataService, IResponse } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private surveys = new BehaviorSubject<Survey[]>([]);

  constructor(
    private restDataSource: DataService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.initializeSurveys();
  }

  // getActiveSurveys(): Survey[]
  // {
  //   let sure : Survey[] =[];
  //   this.restDataSource.getSurveys().subscribe(data => {
  //      sure = data.data;
  //   });
  //   return sure;
  // }

  getSurveys(): Survey[] {
    return this.surveys.getValue();
  }

  getSurvey(id: string): Survey {
    return this.surveys.getValue().find((s) => id === s._id) as Survey;
  }

  addSurvey(survey: Survey): void {
    this.restDataSource.addSurvey(survey).subscribe((data: any) => {
      const addedSurvey = data.data as Survey;
      const error = data.error;

      if (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create survey, please try again.',
          icon: 'error',
        });
        // this.flashMessage.show('Error: failed to create survey, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
      } else if (addedSurvey) {
        Swal.fire({
          title: 'Survey Created',
          text: 'Select your survey to add questions',
          icon: 'success',
        });
        this.initializeSurveys(); // reload surveys
        // this.router.navigateByUrl('/surveys/edit/' + addedSurvey._id);
      }
    });
  }

  deleteSurvey(surveyData: Survey, userID: string): void {
    const userSurveyData = { survey: surveyData, userID };
    this.restDataSource.deleteSurvey(userSurveyData).subscribe((data) => {
      const error = data.error;

      if (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete survey, please try again.',
          icon: 'error',
        });
        // this.flashMessage.show('Error: failed to delete survey, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
      } else {
        this.initializeSurveys(); // reload surveys
      }
    });
  }

  updateSurvey(surveyData: Survey, userID: string): Observable<IResponse> {
    const data = { survey: surveyData, userID };
    return this.restDataSource.updateSurvey(data);
  }
  takeSurvey(survey: Survey): Observable<IResponse> {
    return this.restDataSource.takeSurvey(survey);
  }
  initializeSurveys(): void {
    this.restDataSource.getSurveys().subscribe((data) => {
      this.surveys.next(data.data);
    });
  }

  isActive(survey: Survey): boolean {
    const activeDate = new Date(survey.dateActive as string).getTime();
    const expireDate = new Date(survey.dateExpire as string).getTime();
    if (
      activeDate <= new Date().getTime() &&
      new Date().getTime() <= expireDate
    ) {
      return true;
    } else {
      return false;
    }
  }
}
