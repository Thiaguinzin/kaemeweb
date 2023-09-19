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

}
