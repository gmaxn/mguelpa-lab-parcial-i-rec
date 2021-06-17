import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  public async registrar(repartdor: any) {
    const doc = await this.db.collection<any>("repartidores").add(repartdor);
    this.db.collection<any>("repartidores").doc(doc.id).update({ uid:doc.id }).then(
      res => console.log(res),
      err => this.handleError(err)
    );
  }

  public getAll() {
    return this.db.collection<any>("repartidores")
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