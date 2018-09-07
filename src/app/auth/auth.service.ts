import { UserMapper } from './user.mapper';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from './auth.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

const usersUrl = environment.apiUrl + '/users/';
const loginUrl = 'login';
const signupUrl = 'signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = null;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userMapper: UserMapper
  ) {}

  getUsers(): Observable<User[]> {
    const results = this.http.get<{ message: string; users: Array<any> }>(
      usersUrl
    );
    return results.pipe(
      map(userData => {
        return userData.users.map(user => {
          return this.userMapper.mapFromJson(user);
        });
      })
    );
  }

  addUser(user: User): Observable<any> {
    if (user) {
      user = this.userMapper.mapToJson(user);
      const result = this.http.post<{ message: string; userId: string }>(usersUrl, user);
      return result.pipe(
        map(userData => {
          user.id = userData.userId;
        })
      )
    }
  }

  // updateUser(userId: string, user: User): Observable<any> {
  //   if (user) {
  //     user = this.userMapper.mapToJson(user);
  //     return this.http.put(usersUrl + userId, user);
  //   }
  // }

  getUser(id: string): Observable<any> {
    if (id) {
      const result = this.http.get<{}>(usersUrl + id);
      return result.pipe(
        map(userData => {
          return this.userMapper.mapFromJson(userData);
        })
      );
    }
  }

  deleteUser(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(usersUrl + id);
    }
  }

  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  createUser(auth: Auth): void {
    this.http.post(usersUrl + signupUrl, auth).subscribe(
      response => {
        this.login(auth);
        this.router.navigate(['/']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(auth: Auth): Observable<any> {
    if (auth) {
      const result = this.http.post<{ token: string; expiresIn: number }>(
        usersUrl + loginUrl,
        auth
      );
      return result.pipe(
        map(response => {
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expiresIn = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.token = response.token;
            this.saveAuthData(this.token, expiresIn);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
          } else {
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
          }
        })
      );
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/users/login']);
  }

  private saveAuthData(token: string, expirationDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration)
    };
  }

  private setAuthTimer(expiresInDuration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }
}
