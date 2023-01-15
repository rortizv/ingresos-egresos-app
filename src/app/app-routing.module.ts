import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: '',
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
