import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public userSubscription: Subscription = new Subscription();
  public ingresosEgresosSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }
  
  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe( ({user}) => {
        this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFB: any) => {
            this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresosFB}))
          })
      });

  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosEgresosSubscription?.unsubscribe();
  }

}