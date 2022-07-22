import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Option, OptionType } from 'src/app/core/models/option.model';
import Question from 'src/app/core/models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit, OnChanges {
  @Input() question!: Question | null;
  @Output() save = new EventEmitter();
  public placeholderQuestion!: Question;
  constructor(private flashMessage: FlashMessagesService) {}

  ngOnInit(): void {
    this.initializePlaceholderQuestion();
  }

  // lifecycle hook: executes whenever one of our input prperties have changed
  ngOnChanges(changes: SimpleChanges): void {
    if (this.question) {
      this.placeholderQuestion = this.question;
    }
  }

  onAddOption(): void {
    this.placeholderQuestion.options.push({
      details: '',
    });
  }

  onDelete(index: number): void {
    if (this.placeholderQuestion.options.length > 1) {
      this.placeholderQuestion.options.splice(index, 1);
    }
  }

  // save edits to questions
  onSave(): void {
    // to reset the parent's selectedQuestion (to edit)
    this.save.emit(this.placeholderQuestion);
    // reset form input
    this.initializePlaceholderQuestion();
  }

  initializePlaceholderQuestion(): void {
    this.placeholderQuestion = {
      title: '',
      optionType: OptionType.Multiple_Choice,
      options: [],
    };
  }
  onSelectType(): void {
    if (this.placeholderQuestion.optionType == OptionType.True_Or_False) {
      const options: Option[] = [
        {
          details: 'True',
        },
        {
          details: 'False',
        },
      ];
      this.placeholderQuestion.options = options;
    }
    else{
      this.placeholderQuestion.options = [];
    }
  }
}
