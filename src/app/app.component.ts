import { Component, OnInit } from '@angular/core';
import { IssueService } from './issue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  issues: Issue[] = [];
  isSelected = false;
  issue?: Issue = undefined;

  modalClass = 'hide';
  modalWarning = 'hide';

  deleteRquestId?: Number | String = undefined;

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
  }

  toggleModal() {
    if (this.modalClass === 'hide') {
      this.modalClass = '';
    } else {
      this.modalClass = 'hide';
      this.issue = undefined;
    }
  }

  deleteOption(opt: string) {
    this.modalWarning = 'hide';
    if (opt === 'YES') {
      if (this.deleteRquestId) {
        this.deleteIssue(this.deleteRquestId);
        this.deleteRquestId = undefined;
      }
    }
  }

  deleteRequest(id: Number) {
    this.deleteRquestId = id;
    this.modalWarning = '';
  }

  deleteIssue(id: Number | String) {
    this.issueService.deleteIssue(id).subscribe();
    this.issues = this.issues.filter((issue) => issue.id !== id);
  }

  showDetailEvent(issue: Issue) {
    this.issue = issue;
    this.toggleModal();
  }

  createIssue(issue: Issue) {
    this.issueService.createIssue(issue).subscribe();
    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
  }

  updateIssue(issue: Issue) {
    this.issueService
      .upDateIssue(issue)
      .subscribe((issues) => (this.issues = issues));
    this.issue = undefined;
  }
}
