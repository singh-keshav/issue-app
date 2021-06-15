import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
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

  @Input()
  public get oldIssue() {
    return this._issue;
  }

  public set oldIssue(value: Issue | undefined) {
    this._issue = value;
    if (value) {
      this.issueForm.patchValue(value);
    } else {
      this.issueForm.reset();
    }
  }

  @Output() oldIssueUpdatedEvent = new EventEmitter<Issue>();
  @Output() newIssueCreatedEvent = new EventEmitter<Issue>();

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private activeRoute: ActivatedRoute
  ) {}

  public issueForm = this.formBuilder.group({
    title: '',
    description: '',
    priority: 0,
    updatedOn: '',
    createdOn: '',
  });

  private reset() {
    this.issueForm.reset();
  }

  handleSubmit() {
    this.oldIssue
      ? this.oldIssueUpdatedEvent.emit(this.issueForm.value)
      : this.newIssueCreatedEvent.emit(this.issueForm.value);
    this.reset();
  }

  // private params = {};
  // public issueExist = false;

  // public ngOnInit(): void {
  //   this.activeRoute.params.subscribe((params) => {
  //     this.params = params;
  //     console.log(this.params);
  //     if (params.id) {
  //       console.log(params.id);
  //       this.issueExist = true;
  //       this.issueService
  //         .getIssue(params.id)
  //         .subscribe((issue) => this.issueForm.patchValue(issue));
  //       console.log('inside if condition');
  //     }
  //   });
  // }

  // public handleSubmit() {
  //   this.issueExist
  //     ? this.issueService
  //         .upDateIssue(this.issueForm.value, this.params)
  //         .subscribe()
  //     : this.issueService.createIssue(this.issueForm.value).subscribe();
  //   this.reset();
  //   this.router.navigate(['/']);
  // }
}
