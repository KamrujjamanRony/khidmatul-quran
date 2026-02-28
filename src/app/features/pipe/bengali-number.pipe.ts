import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bengaliNumber',
  standalone: true
})
export class BengaliNumberPipe implements PipeTransform {

  transform(value: string): string {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    let bengaliValue = '';
    for (let i = 0; i < value?.length; i++) {
      const char = value[i];
      const index = englishDigits.indexOf(char);
      bengaliValue += index !== -1 ? bengaliDigits[index] : char;
    }
    return bengaliValue;
  }

}
