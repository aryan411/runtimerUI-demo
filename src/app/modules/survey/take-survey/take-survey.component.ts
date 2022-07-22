import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { OptionType } from 'src/app/core/models/option.model';
import Question from 'src/app/core/models/question.model';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey/survey.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})

export class TakeSurveyComponent implements OnInit, AfterViewInit {
  // survey: Survey;
  // TODO: include overlay in html
  showCannotTakeOverlay!: boolean;

  constructor(
    private route: ActivatedRoute,
    private surveyRepository: SurveyService,
    public router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    
    if (this.survey && this.survey.questions) {
      this.survey.questions.forEach((question, i) => {
        // question.chosenOptions = null;
        // reset count to zero. update will be in backend
        if(this.survey.questions && this.survey.questions[i].options){
          this.survey.questions[i].options.forEach(option => {
            option.count = 0;
          });
        }
        
      });
    }
  }

  get survey(): Survey {
    const id = this.route.snapshot.params.id;
    return this.surveyRepository.getSurvey(id) as Survey;
  }

  // reroute if survey is inactive
  ngAfterViewInit(): void {
    
    if (this.survey && !this.surveyRepository.isActive(this.survey)){

      // removove elements from site
      const content = document.getElementById('mainContainer') as HTMLElement;
      content.parentNode?.removeChild(content);

      // display alert
      Swal.fire({
        title: 'OOPS! :(',
        text: 'You can\'t take this survey yet!',
        icon: 'warning',
        width: 800,
        padding: '3em',
        allowOutsideClick: false,
        backdrop: `
          rgba(0,0,0,0.9)
        `
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/');
        }
      });
    }
  }

  onCancelSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your answers will not be saved.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I\'m sure',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/');
      }
    });
  }

  onConfirmSubmit(event: Event): void {
    event.preventDefault();
    if(this.AllAnswered())
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able change your answers.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.surveySave();
      }
    });
    else {
      this.flashMessage.show('To Submit the Survey, please answer all the questions.', {cssClass: 'alert-danger', timeOut: 6000});
    }
  }

  surveySave(): any {

    // checking the selected option and updating the options count
    if (this.survey && this.survey.questions)
    for (let index = 0; index <=  this.survey.questions.length - 1; index++)
    {
      const question = this.survey?.questions[index] as Question;
      const options = this.survey.questions[index].options;
      const chosenOptions = this.survey.questions[index].chosenOptions as string;
      debugger
      for (let j = 0; j <= options.length - 1; j++)
      {
        
          if (question != undefined && question.chosenOptions && question.options != undefined && question.options[j].count != undefined &&  question.options.some(q => q.details == question.chosenOptions))
          {
             question.options[j].count  = question.options[j].count as number + 1; 
          }
          
      }

      question.chosenOptions = undefined; // reset chosen option
    }

    this.surveyRepository.takeSurvey(this.survey).subscribe(data => {
      const error = data.error;

      if (error) {
        Swal.fire({
          title: 'Oh no! :(',
          text: 'Something bad happened, please try again',
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Submitted!',
          text: 'Thank you for completing this survey :)',
          icon: 'success',
          allowOutsideClick: false
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/');
          }
        });
      }
    });
  }


  onSelectOption(question: Question, optionId: string): void {

    // initializing array
    // if (!question.chosenOptions) {
      
    // }

    // if (question.optionType === OptionType.Multiple_Choice )  {
      question.chosenOptions = optionId;
    // } else if (question.optionType === OptionType.True_Or_False) {
    //   if (!question.chosenOptions.includes(optionId)) // if first selection
    //   {
    //     question.chosenOptions.push(optionId); // add to chosen options
    //   } else {
    //     question.chosenOptions.splice(question.chosenOptions.indexOf(optionId), 1); // else remove
    //   }
    // }
  }

  checkIfSelected(question: Question, optionId: string | undefined): boolean {
    if (question && question.chosenOptions && optionId) {
      const condition = question.chosenOptions.indexOf(optionId) > -1; // checks if the option is in the array
      return condition;
    }
    return false;
  }
  AllAnswered():boolean{
  
    if (this.survey && this.survey.questions)
    for (let index = 0; index <=  this.survey.questions.length - 1; index++)
    {
      const question = this.survey?.questions[index] as Question;
      const options = this.survey.questions[index].options;
      const chosenOptions = this.survey.questions[index].chosenOptions as string;
      debugger
   
        
          if (question != undefined && question.chosenOptions && question.options != undefined  &&  question.options.some(q => q._id == question.chosenOptions))
          {
             question.options.forEach(op => {
              if(op._id == question.chosenOptions)
              op.count ?  op.count += 1  : op.count = 1;
            })
          }
          else {
           return false;
          }

      // question.chosenOptions = undefined; // reset chosen option
    }
    return true;
  }
}
