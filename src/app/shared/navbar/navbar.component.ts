import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public nombre: string = '';
  userSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(({user}) => user != null)
      )
      .subscribe(({ user }) => this.nombre = user.nombre);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}