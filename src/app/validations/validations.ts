import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function unidadUnicaValidator(formArray: FormArray): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const unidadSeleccionada = control.value;
    const unidades = formArray.controls.filter((control) => control.get('nombreUnidad')?.value == unidadSeleccionada);

    if (unidades.length > 1) {
      return { unidadRepetida: true };
    }
    return null;
  };
}

export function almacenUnicoValidator(formArray: FormArray): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const unidadSeleccionada = control.value;
    const unidades = formArray.controls.filter((control) => control.get('nombreAlmacen')?.value == unidadSeleccionada);

    if (unidades.length > 1) {
      return { almacenRepetido: true };
    }
    return null;
  };
}