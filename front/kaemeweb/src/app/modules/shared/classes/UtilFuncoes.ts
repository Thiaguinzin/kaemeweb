export class UtilFuncoes {

  static replaceNumbersWithLetters(input: string): string {

    const numberToLetterMap: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    const sb: string[] = [];

    for (const c of input) {

      if (!isNaN(Number(c))) {

        const index = parseInt(c, 10);
        if (index >= 1 && index <= numberToLetterMap.length) {
          sb.push(numberToLetterMap[index - 1]);
        } else {

          sb.push('?');
        }
      } else {

        sb.push(c);
      }
    }

    return sb.join('');
  }

  static dateToNumericString(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return year + month + day + hours + minutes + seconds;
  }

  static hasValue(value: any | null): boolean {

    if (value) {

      if (value.toString().trim() != "") {
        return true;
      }
      else {
        return false;
      }

    }
    else {
      return false;
    }

  }

  static getSigno(data_nasc: Date): string {

    const dia = data_nasc.getDate();
    const mes = data_nasc.getMonth() + 1; // O mês começa em zero, então somamos 1

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
      return 'ARIES';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
      return 'TOURO';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
      return 'GEMEOS';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
      return 'CANCER';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
      return 'LEAO';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
      return 'VIRGEM';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
      return 'LIBRA';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
      return 'ESCORPIAO';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
      return 'SAGITARIO';
    } else if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) {
      return 'CAPRICORNIO';
    } else if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
      return 'AQUARIO';
    } else {
      return 'PEIXES';
    }

  }

//Recebe: 1 - Evento ao digitar em um input, 2 - Tipo de formatação
  //Retorna: Nada, seta no input a string formatada de acordo com o tipo de formatação passado por parametro
  static formatarStringInput(event: any, tipoFormatacao: number)
  {
    let termo: string = event.srcElement.value
    event.srcElement.value = this.formatarString(termo, tipoFormatacao);
  }


  //Recebe: 1 - String a ser formatada, 2 - Tipo de formatação
  //Retorna: String formatada de acordo com o tipo passado por parâmetro
  static formatarString(termo: string, tipoFormatacao: number): string{
    switch (tipoFormatacao) {
      case 0:{ //aceita espaço, letras maiusculas, NÃO aceita caracteres especiais, aceita numeros
        termo = termo.toUpperCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '').replace('  ', ' ')
        break;
      }
      case 1:{ //aceita espaço, letras maiusculas, NÃO aceita caracteres especiais, NÃO aceita numeros
        termo = termo.toUpperCase().normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z\s])/g, '').replace('  ', ' ')
        break;
      }
      case 2:{  //aceita espaço, letras maiusculas, NÃO aceita caracteres especiais, aceita numeros, aceita ç
        termo = termo.toUpperCase().normalize('NFD').replace(/^a-zA-Z\s\Ç/g, '').replace('  ', ' ')
        break;
      }
      case 3:{  //aceita espaço, NÂO letras maiusculas, NÃO aceita caracteres especiais, aceita numeros, NÂO aceita ç
        termo = termo.toUpperCase().normalize('NFD').replace(/\D/g, '');
        break;
      }
      case 4:{  //somente números e hífen
        termo = termo.toUpperCase().normalize('NFD').replace(/[^\d.-]/g,'').replace('  ', '')
        break;
      }
      case 5:{  //fenotipagem, apenas "P", "N" e "?"
        termo = termo.toUpperCase().normalize('NFD').replace(/[^PpNn?]/g,'').replace('  ', '')
        break;
      }
      case 6:{  //somente números e sinal de negativo e ponto
        termo = termo.toUpperCase().normalize('NFD').replace(/[^0-9.-]/g,'').replace('  ', '')
        break;
      }
      case 7:{  //somente números e um unico ponto
        termo = termo.toUpperCase().normalize('NFD').replace(/[^0-9.,]/g,'').replace('  ', '').replace(',', '.').replace(/[.,]([.,])[.,]/g, '$1').replace(/^\./, '0.')
        break;
      }

      case 8:{  //letras maiusculas
        termo = termo.toUpperCase().normalize('NFD')
        break;
      }

      case 9:{  //somente números de 1 a 9
        termo = termo.toUpperCase().normalize('NFD').replace(/[^1-9]/g,'').replace('  ', '')
        break;
      }

      default:
        break;
    }
    if(termo.length == 1 && termo == ' ')
      termo = termo.trim();

    return termo;
  }

}
