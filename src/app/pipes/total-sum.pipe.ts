import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalSum'
})
export class TotalSumPipe implements PipeTransform {

  transform(value: number): number {
    return +value.toFixed(2);
  }

}
