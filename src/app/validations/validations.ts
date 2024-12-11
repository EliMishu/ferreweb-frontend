import { AbstractControl, AsyncValidatorFn, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { getImageTypes } from '../constants/image.constants';
import { Observable, of } from 'rxjs';

export function unidadUnicaValidator(formArray: FormArray): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const unidadSeleccionada = control.value;

    if (unidadSeleccionada === '') return null;

    const unidades = formArray.controls.filter((control) => control.get('nombreUnidad')?.value == unidadSeleccionada);

    if (unidades.length > 1) {
      return { unidadRepetida: true };
    }
    return null;
  };
}

export function almacenUnicoValidator(formArray: FormArray): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const almacenSeleccionado = control.value;

    if (almacenSeleccionado === '') return null;

    const almacenes = formArray.controls.filter((control) => control.get('nombreAlmacen')?.value == almacenSeleccionado);

    if (almacenes.length > 1) {
      return { almacenRepetido: true };
    }
    return null;
  };
}

export function fechaLimiteValidator(days: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaLimite = control.value;

    if (!fechaLimite) {
      return null;
    }

    const today = new Date();
    today.setDate(today.getDate() + days - 1); 

    const fecha = new Date(fechaLimite);

    if (fecha < today) {
      return { fechaLimiteInvalida: `La fecha debe ser al menos ${days} días después de hoy` };
    }

    return null;
  };
}

export function fechaHoyOMenorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaValue = control.value;

    if (!fechaValue) {
      return null;
    }

    const today = new Date();

    const fecha = new Date(fechaValue);

    if (fecha > today) {
      return { fechaInvalida: 'La fecha no puede ser después de hoy' };
    }

    return null;
  };
}

export function isNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;

    if (typeof val === "number" && val === val) {
      return null;
    }

    return { isNumber: 'Debe ingresar un número' }
  }
}

export function isNumberAsync(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const val = control.value;

    if (typeof val === 'number' && val === val) {
      return of(null); 
    }

    return of({ isNumber: 'Debe ingresar un número' });
  };
}

export function imagenValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const archivo = control.value;

    if (!archivo) {
      return null;
    }

    const tipo = archivo.type;

    if (!tipo || !getImageTypes().includes(tipo)) {
      return { tipoArchivoInvalido: 'El tipo de archivo no es válido. Solo se permiten imágenes.' };
    }

    return null;
  };
}

export function fileValidator(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const archivo = control.value;

    if (!archivo) {
      return null;
    }

    const tipo = archivo.type;

    if (!tipo || !types.includes(tipo)) {
      return { tipoArchivoInvalido: 'El tipo de archivo no es válido.' };
    }

    return null;
  }
}
