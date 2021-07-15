import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number): string {

    let symbol:string ="X";
    let rates="";
    for(let i=1;i<=value;i++) {

      rates=rates+symbol
    }
    

    return rates;
  }

}
