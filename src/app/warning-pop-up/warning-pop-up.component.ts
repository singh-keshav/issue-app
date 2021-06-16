import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warning-pop-up',
  templateUrl: './warning-pop-up.component.html',
  styleUrls: ['./warning-pop-up.component.scss'],
})
export class WarningPopUpComponent implements OnInit {
  @Output() deleteOptionEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteOption(opt: string) {
    opt === 'YES'
      ? this.deleteOptionEvent.emit('YES')
      : this.deleteOptionEvent.emit('NO');
  }
}
