import { Keys } from './../../global.constants';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth } from '../auth.model';
import { AuthService } from '../../auth/auth.service';
import { User } from '../user.model';
import { UserMessages } from '../users.constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoggedIn = false;
  totalUsers = 0;
  keys = Keys;
  showDelete = false;
  title: string = null;
  message: string = null;
  type: string = null;
  userToDeleteId: string = null;
  isLoading = false;
  searchText = '';
  userMessages = UserMessages;

  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  addUser(): void {

  }

  getUsers = () => {
    this.isLoading = true;
    this.authService.getUsers().subscribe(
      data => {
        this.users = [...data];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  };

  openDeleteModal(user: Auth): void {
    if(this.users.length > 1) {
      this.title = 'Delete user';
      this.message = 'Are you sure you want to delete ' + user.email;
      this.type = this.keys.danger;
      this.userToDeleteId = user.id;
      this.showDelete = true;
    }
  }

  deleteUser(item: any): void {
    this.closeDelete();
    if (item.result) {
      this.isLoading = true;
      this.authService.deleteUser(item.id).subscribe(
        data => {
          const updatedUsers = this.users.filter(
            user => user.id !== item.id
          );
          this.users = [...updatedUsers];
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
    this.userToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.userToDeleteId = null;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
