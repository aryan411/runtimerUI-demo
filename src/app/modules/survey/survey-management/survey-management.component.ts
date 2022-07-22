import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { createPopper } from '@popperjs/core';
import { Survey } from 'src/app/core/models/survey.model';
import { User } from 'src/app/core/models/User';
import { SurveyService } from 'src/app/core/services/survey/survey.service';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.css']
})
export class SurveyManagementComponent implements OnInit, AfterViewInit {
  public newSurvey!: Survey ;
  user!: User;

  constructor(private repository: SurveyService) {}

  ngOnInit(): void {
    this.initializeNewSurvey();
    this.repository.initializeSurveys();
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  get surveys(): Survey[]
  {
    // display only surveys made by current user
    return this.repository.getSurveys().filter((survey) => survey.user === this.user.id);
  }


  ngAfterViewInit(): void {

  }

  onCreateSurvey(): void {
    this.newSurvey.user = this.user.id;
    this.repository.addSurvey(this.newSurvey);
    this.initializeNewSurvey();
    
  }

  onDeleteSurvey(survey: Survey): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able recover this survey.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete forever',
      cancelButtonText: 'No, I change my mind'
    }).then((result) => {
      if (result.value) {
        this.repository.deleteSurvey(survey, this.user.id);
        Swal.fire({
          title: 'Survey deleted',
          icon: 'success'
        });
      }
    });
  }

  onShareLink(id: string | undefined, event: any): void {
    const link = "https://runtimer-ui-demo.herokuapp.com"
    // needs a text area to work. removed after copy
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    const message = document.getElementById(event.target.nextSibling.id) as HTMLElement;
    message.innerText = 'Link copied!';
  }

  showTooltip(event: any): void {
    const icon = document.getElementById(event.target.id) as HTMLElement;
    const message = document.getElementById(event.target.nextSibling.id) as HTMLElement;
    message.innerText = 'Click to copy';
    message.classList.add('show-tooltip');
    createPopper(icon, message, {
      placement: 'right-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }

  hideTooltip(event: any): void {
    const icon = document.getElementById(event.target.id);
    const message = document.getElementById(event.target.nextSibling.id) as HTMLElement;
    message.classList.remove('show-tooltip');
  }


  initializeNewSurvey(): void {
    this.newSurvey = {
      name: ''
    };
  }
}
