import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  public ingresoEgresoForm: FormGroup = new FormGroup({});
  public tipo = 'ingreso';

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  guardar() {
    if (this.ingresoEgresoForm.invalid) { return; }
    console.log(this.ingresoEgresoForm.value);
    console.log(this.tipo);
    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.ingresoEgresoForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'REGISTRO EXITOSO',
          text: 'Se ha creado su registro satisfactoriamente'
        })
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Ha ocurrido un error al crear el registro'
        })
      })
  }

}