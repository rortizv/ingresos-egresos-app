import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSubscription: Subscription = new Subscription();
  public _user: Usuario | null = null;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          })
        } else {
          this._user = null;
          this.userSubscription?.unsubscribe();
          this.store.dispatch(authActions.unSetUser());
          this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const nuevoUsuario = new Usuario(user?.uid!, nombre, user?.email!);
        return this.firestore.doc(`${user?.uid}/usuario`)
          .set({ ...nuevoUsuario });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    )
  }

}
