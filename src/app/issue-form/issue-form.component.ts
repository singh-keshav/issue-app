import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent {
  private _issue?: Issue;

  @Output() oldIssueUpdatedEvent = new EventEmitter<Issue>();
  @Output() newIssueCreatedEvent = new EventEmitter<Issue>();
  @Output() closeModalEvent = new EventEmitter();

  @Input()
  public get oldIssue() {
    return this._issue;
  }

  public set oldIssue(value: Issue | undefined) {
    this._issue = value;
    if (value) {
      this.issueForm.patchValue(value);
      console.log(value);
      console.log(this.issueForm.value);
    } else {
      this.issueForm.reset();
    }
  }

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private activeRoute: ActivatedRoute
  ) {}

  public issueForm = this.formBuilder.group({
    id: '',
    title: '',
    description: '',
    projectName: '',
    priority: 0,
    timestamps: {
      updatedOn: '',
      createdOn: '',
    },
  });

  private reset() {
    this.issueForm.reset();
  }
  public closeModal() {
    this.closeModalEvent.emit();
  }

  handleSubmit() {
    this.oldIssue
      ? this.oldIssueUpdatedEvent.emit(this.issueForm.value)
      : this.newIssueCreatedEvent.emit(this.issueForm.value);
    this.reset();
    this.closeModal();
  }
}
