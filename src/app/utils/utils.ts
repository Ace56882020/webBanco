import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor() {}

  formatNumberInput(value: string): string {
    // Permitir solo números y comas
    let cleanedValue = value.replace(/[^0-9,]/g, '');

    // Si el valor tiene más de un número antes de la coma
    const parts = cleanedValue.split(',');
    if (parts[0].length > 1) {
      cleanedValue = parts[0][0] + ',' + parts[0].slice(1);
    }

    return cleanedValue;
  }
  formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  formatDateSubmit = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  formatDateEdit = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  formatDateValue = (date: any) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
 
}
