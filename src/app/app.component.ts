import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
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

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
  }

  toggleModal() {
    this.modalClass =
      this.modalClass === 'hide'
        ? (this.modalClass = '')
        : (this.modalClass = 'hide');
  }

  deleteIssue(id: Number) {
    this.issueService.deleteIssue(id).subscribe();
    this.issues = this.issues.filter((issue) => issue.id !== id);
    console.log(id);
    console.log('inside delete');
  }

  showDetailEvent(issue: Issue) {
    console.log(issue);
    this.issue = issue;
    this.toggleModal();
  }

  createIssue(issue: Issue) {
    this.issueService.createIssue(issue).subscribe();
    console.log('inside create');
    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
    // this.issues = [issue, ...this.issues];
  }

  updateIssue(issue: Issue) {
    console.log(issue);
    this.issueService.upDateIssue(issue).subscribe();
    console.log('inside update');

    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
    // this.issues = this.issues.map((_issue) => {
    //   return _issue.id === issue.id ? issue : _issue;
    // });
  }
}
