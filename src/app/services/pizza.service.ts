import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  public async create(pizza: any) {
    const doc = await this.db.collection<any>("pizzas").add(pizza);
    this.db.collection<any>("pizzas").doc(doc.id).update({ uid:doc.id }).then(
      res => console.log(res),
      err => this.handleError(err)
    );
  }

  public async edit(pizza: any) {
    // const doc = await this.db.collection<any>("pizzas").add(pizza);
    this.db.collection<any>("pizzas").doc(pizza.uid).update(pizza).then(
      res => console.log(res),
      err => this.handleError(err)
    );
  }

  public async delete(pizza: any) {
    // const doc = await this.db.collection<any>("pizzas").add(pizza);
    this.db.collection<any>("pizzas").doc(pizza.uid).delete().then(
      res => console.log(res),
      err => this.handleError(err)
    );
  }

  public getAll() {
    return this.db.collection<any>("pizzas")
    .valueChanges()
    .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }


}
