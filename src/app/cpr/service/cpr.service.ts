import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestResponse } from '../model/lista.model';



@Injectable({
  providedIn: 'root'
})
export class CprService {

  constructor(
    
    private http: HttpClient
  ) { }
 
  /*getAll()  {
    const url="http://localhost:3000/data";
    return this.http.get<RequestResponse>(url)
              .pipe(
                map(resp=>{
                  return resp;
                })
                  
              )
  }*/

  getAll(){
    return this.http.get<RequestResponse[]>("http://localhost:3000/data");
  }
  filtrar(rucDni:string){
    return this.http.get<RequestResponse[]>(`http://localhost:3000/data?ruc_dni=${rucDni}`);
  }

  
}
