import { Pipe, PipeTransform } from '@angular/core';
import { RequestResponse } from '../model/lista.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(request: RequestResponse[], ...args: unknown[]): unknown {
    console.log(request);

    return request;
  }

}
