import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Keys } from '../../global.constants';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  @Output()
  usersModalResult = new EventEmitter<{result: boolean, id: string}>();
  @Input('name')
  name: string;
  @Input('title')
  title: string;
  @Input('message')
  message: string;
  @Input('type')
  type: string;
  @Input('id')
  id: string;

  modalOpen = false;
  keys = Keys;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.modalOpen = true;
    }, 0);
  }
  ok(): void {
    this.usersModalResult.next({result: true, id: this.id});
  }

  cancel(): void {
    this.usersModalResult.next({result: false, id: this.id});
  }
}
