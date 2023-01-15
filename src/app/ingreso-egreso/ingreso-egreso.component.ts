import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public ingresoEgresoForm: FormGroup = new FormGroup({});
  public tipo = 'ingreso';
  public cargando: boolean = false;
  public loadingSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading);
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {

    if (this.ingresoEgresoForm.invalid) { return; }
    this.store.dispatch( ui.isLoading() );
    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'success',
          title: 'REGISTRO EXITOSO',
          text: 'Se ha creado su registro satisfactoriamente'
        })
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Ha ocurrido un error al crear el registro'
        })
      })
  }

}