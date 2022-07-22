import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Question from 'src/app/core/models/question.model';
import { Survey } from 'src/app/core/models/survey.model';
import { User } from 'src/app/core/models/User';
import { SurveyService } from 'src/app/core/services/survey/survey.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit, AfterViewInit{
  public selectedQuestion!: Question | null;
  private user!: User;
  survey!:any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyRepository: SurveyService,
    private flashMessage: FlashMessagesService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    const id = this.route.snapshot.params.id;
    this.survey =  this.surveyRepository.getSurvey(id);
    // reroute user if not his own survey
    if (this.user?.id !== this.survey?.user) {
      this.router.navigateByUrl('/error');
    }
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  // get survey(): Survey {
    
  // }

  onQuestionEdit(question: Question): void {
    this.selectedQuestion = question;
  }

  onQuestionSave(question: Question): void {
    // check if edit or add
    if (this.selectedQuestion) {
      this.selectedQuestion = question;
    } else {
      this.survey.questions!.push(question);
    }
    this.selectedQuestion  = null ;
  }

  onCancelEdit(event: Event): void {

    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You changes will not be saved.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, discard changes',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/surveys');
      }
    });

  }

  onSurveySave(): void {
    if (this.validateDates() && this.validateQuestions()) {
      // if dates and number of questions are valid
      this.surveyRepository.updateSurvey(this.survey, this.user.id).subscribe(data => {
        const error = data.error;
        if (error) {
          this.flashMessage.show('Update failed, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
        } else {
          this.surveyRepository.initializeSurveys();
          this.flashMessage.show('Survey updated', {cssClass: 'alert-success', timeOut: 6000});
          this.router.navigateByUrl('/surveys');
        }
      });
    }
  }

  validateDates(): boolean {
    let activeDate , expireDate, currentDate;
    currentDate = (new Date(Date.now())).getTime() - 60000; // adjust by one minute to allow user to select current time;
    if(this.survey.dateActive && this.survey.dateActive != "")
    {
      activeDate = new Date(this.survey.dateActive as string).getTime();
    }
    else
    {
      this.survey.dateActive = new Date().toISOString();
      activeDate = new Date(this.survey.dateActive as string).getTime();
      
    }
    if(this.survey.dateExpire && this.survey.dateExpire != "")
    {
      expireDate = new Date(this.survey.dateExpire as string).getTime();
    }
    else
    {
      this.survey.dateExpire = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      expireDate = new Date(this.survey.dateExpire as string).getTime();
    }
    let errorMessage;
    // if (activeDate < currentDate) {
    //   errorMessage = 'Error: Active date cannot be earlier than current date';
    // }

    if (expireDate <= activeDate) {
      errorMessage = 'Error: Expiry date cannot be before date active.';
    }

    if (errorMessage) {
      this.flashMessage.show(errorMessage, {cssClass: 'alert-danger', timeOut: 6000});
    }

    return errorMessage ? false : true;
  }

  validateQuestions(): boolean {
    if (this.survey.questions!.length < 1) {
      this.flashMessage.show('Error: Survey must have at least one question', {cssClass: 'alert-danger', timeOut: 6000});
      return false;
    } else {
      return true;
    }
  }
}
