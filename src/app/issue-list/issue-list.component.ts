import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent {
  @Input() issues: Issue[] = [];
  @Output() deleteIssueEvent = new EventEmitter<Number>();
  @Output() showDetailEvent = new EventEmitter<Issue>();
  // public issues: Issue[] = [];

  deleteIssue(event: MouseEvent, issue: Issue) {
    event.stopPropagation();
    this.deleteIssueEvent.emit(issue.id);
  }

  showIssue(issue: Issue) {
    console.log(issue);
    this.showDetailEvent.emit(issue);
  }

  // deleteIssue(issue: Issue) {
  //   // this.issues = this.issues.filter((i) => i.id !== issue.id);
  //   this.issueService.deleteIssue(issue.id).subscribe();
  //   this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
  //   console.log(issue.id);
  // }
}
