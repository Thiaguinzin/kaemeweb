import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export class Validadores {

  static dataNaoFuturaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const dataInput = moment(control.value, "DDMMYYYYHHmm").toDate();
      const dataAtual = new Date();

      if (dataInput > dataAtual) {
        return { dataNaoFutura: true }; // A data é futura, retorne um erro
      }

      return null; // A data é válida
    };
  }

}
