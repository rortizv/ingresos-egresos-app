import { ChartData } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppStateIngresos } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  public ingresos: number = 0;
  public egresos: number = 0;
  public totalIngresos: number = 0;
  public totalEgresos: number = 0;
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      { data: [] }
    ]
  };

  constructor(
    private store: Store<AppStateIngresos>
  ) { }

  ngOnInit() {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    
    this.doughnutChartData = {
      datasets: [
        { data: [this.totalIngresos, this.totalEgresos] }
      ]
    }
  }

}