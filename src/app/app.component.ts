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

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => (this.issues = issues));
  }

  deleteIssue(id: Number) {
    this.issueService.deleteIssue(id).subscribe();
    this.issues = this.issues.filter((issue) => issue.id !== id);
    console.log(id);
  }

  showDetailEvent(issue: Issue) {
    this.issue = issue;
  }

  public async createIssue(issue: Issue) {
    await this.issueService.createIssue(issue).toPromise();
    this.issues = [issue, ...this.issues];
  }

  updateIssue(issue: Issue) {
    this.issueService.upDateIssue(issue);
    this.issues = this.issues.map((_issue) => {
      return _issue.id === issue.id ? issue : _issue;
    });
  }
}
