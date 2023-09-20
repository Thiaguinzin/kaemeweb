import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { finalize, Observable } from 'rxjs';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { UtilFuncoes } from '../classes/UtilFuncoes';
import * as moment from 'moment';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    utilFuncoes = UtilFuncoes;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // debugger

      if (!req.url.includes('viacep')) {
        if (this.tokenService.hasToken()) {
          const token: UsuarioToken = JSON.parse(this.tokenService.getToken());
          req = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
          });

          if(req.body != null && req.body != undefined){
              this.corrigirDatas(req.body)
          }
      }
      //O CABEÇALHO VAI INCLUSIVE NAS REQUISIÇÕES NÃO AUTENTICADAS COM O TOKEN
      let path = this.getEndPoint(req.url);
      let dataCode = this.utilFuncoes.replaceNumbersWithLetters(this.utilFuncoes.dateToNumericString(new Date))
      req = req.clone({
          headers: req.headers.set('shw-rhw-a', this.generateHash(path + "|." + dataCode))
          //headers: req.headers.set('shw-rhw-a', this.generateHash(path + "|." + this.utilFuncoes.dateToNumericString(new Date)))
      });
      // console.log(dataCode)
      // console.log(this.utilFuncoes.dateToNumericString(new Date))

        return next.handle(req);
      }

      return next.handle(req);

    }

    generateHash(input: string): string {
        // const hash = crypto.createHash('sha256');
        // hash.update(input);
        // return hash.digest('hex');

        const buffer = btoa(input);
        return buffer.toString();
      }

    getEndPoint(url: string): string {
        if(url != null && url.substring(0,4).toString() == "http")
        {

            let startIndex = url.indexOf("/", "http://".length);
            let path = url.substring(startIndex);
            return path;
        }
        return "";

    }

    corrigirDatas(req: any){
        if (typeof(req) === 'object'){
            Object.keys(req).forEach(key => {
                this.varrerItens(req, key);
            })
        }
    }

    varrerItens(itemRecebido: any, keyRecebida: any){
        if(itemRecebido[keyRecebida] == null)
            return;

        switch (typeof(itemRecebido[keyRecebida])) {
            case 'object':
                if(Object.prototype.toString.call(itemRecebido[keyRecebida]) === '[object Date]'){
                    itemRecebido[keyRecebida] = moment(itemRecebido[keyRecebida]).format("YYYY-MM-DDTHH:mm:ss")
                    break;
                }
                Object.keys(itemRecebido[keyRecebida]).forEach(key => {
                    this.varrerItens(itemRecebido[keyRecebida], key);
                })
            break;

            default:
            break;
        }
    }
}
