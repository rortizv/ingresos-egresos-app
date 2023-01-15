import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppStateIngresos } from '../ingreso-egreso.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingresosEgresos: IngresoEgreso[] = [];
  public ingresosSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateIngresos>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosSubscription = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.ingresosEgresos = items as unknown as IngresoEgreso[] );
  }

  ngOnDestroy() {
    this.ingresosSubscription.unsubscribe();
  }

  borrarItem(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Eliminado', 'Item eliminado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
