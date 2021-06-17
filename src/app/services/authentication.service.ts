import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserClaims } from '../models/user-claims';
import { UserCredentials } from '../models/user-credentials';
// import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private logged = new BehaviorSubject(this.isLogged());
  logged$ = this.logged.asObservable();

  
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    // private logged: LoggedEventService
  ) { }

  public async signIn(user: UserCredentials) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(user.username, user.password).then(response => {
        // 1. get user profile info
        this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
          const claims: any = data;
          localStorage.setItem('userCredentials', JSON.stringify(claims));
          this.logged.next(true);
          this.router.navigate(['bienvenida']);
          resolve(claims);
        });
      }).catch(err => reject(err.message));
    });
  }

  public async signUp(user: UserCredentials) {
    return new Promise<any>((resolve, reject) => {

      this.auth.createUserWithEmailAndPassword(user.username, user.password).then(response => {
        // 1. persist profile info
        const claims: any = {
          username: user.username,
          password: user.password,
          uid: response.user?.uid
        }
        this.db.collection<any>("users").doc(response.user?.uid).set(claims).then(() => {
          // 2. get last inserted user
          this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
            // 3. set local storage
            const credentials = {
              uid: data.uid,
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.email,
              roles: data.roles
            };
            localStorage.setItem('userCredentials', JSON.stringify(credentials));
            this.logged.next(true);
            this.router.navigate(['/bienvenida']);
            resolve(credentials)
          });
        });
      }).catch(error => reject(error));

    });
  }

  public async signOut() {
    localStorage.removeItem('userCredentials');
    localStorage.clear();
    this.logged.next(false);
    this.router.navigate(['/bienvenida']);
  }

  public isLogged() {
    const item = localStorage.getItem('userCredentials');
    return (item !== null) ? true : false;
  }

  public getCurrentUser() {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    return user?.email;
  }

  public getCurrentUserCredentials() {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    return user;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }
}
