import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

import { Alert } from 'selenium-webdriver';
import { RequestResponse } from './model/lista.model';
import { CprService } from './service/cpr.service';

@Component({
  selector: 'app-cpr',
  templateUrl: './cpr.component.html',
  styles: [
  ]
})
export class CprComponent implements OnInit {
  pipe!: DatePipe;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate')?.value; }
  get toDate() { return this.filterForm.get('toDate')?.value; }
  dt: RequestResponse[] = [];
  displayedColumns: string[] = ['ruc_dni', 'referencia_factura', 'moneda', 'importe_documento', 'importe_retencion', 'importe_cancelado', 'banco', 'cuenta_abono', 'fecha_pago', 'concepto_pago'];
  dataSource = new MatTableDataSource<RequestResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private cprService: CprService,

  ) {
  }


  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    this.cprService.getAll()
      .subscribe(resp => {
        this.llenarTabla(resp);
      })
  }
  llenarTabla(resp: RequestResponse[]) {
    this.dataSource = new MatTableDataSource<RequestResponse>(resp);
    this.dataSource.paginator = this.paginator;
    this.dt = resp;
  }

  filtroFactura(factura: string) {
    this.dataSource.filter = factura.trim().toLocaleLowerCase();
  }
  

  filtroFechas() {
    
    const start = moment(this.fromDate).format('YYYY MM DD');
    const end = moment(this.toDate).format('YYYY MM DD');
    if (start != "Invalid date" && end != "Invalid date") {
      
      if(start<end){
        this.llenarTabla(this.dt);
      this.dataSource.data = this.dataSource.data
        .filter
        (data => moment(data.fecha_pago).format('YYYY MM DD') >= start
          && moment(data.fecha_pago).format('YYYY MM DD') <= end)
        ;
      }else{
        alert("la fecha cominezo no puede ser mayor");
      }
    } else if (start != "Invalid date" && end == "Invalid date") {
      console.log("fecha inicio" + start);
      this.llenarTabla(this.dt);
      this.dataSource.data = this.dataSource.data
        .filter
        (data => moment(data.fecha_pago).format('YYYY MM DD') >= start);
    } else if (start == "Invalid date" && end != "Invalid date") {
      console.log("fecha final" + end);
      this.llenarTabla(this.dt);
      this.dataSource.data = this.dataSource.data
        .filter
        (data => moment(data.fecha_pago).format('YYYY MM DD') <= end);
    }else{
      console.log("elsee");
    }

  }

}









