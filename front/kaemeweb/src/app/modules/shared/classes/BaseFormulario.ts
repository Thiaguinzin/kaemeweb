import { PageEvent } from '@angular/material/paginator';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-base',
  template: '',
  styles: []
})


export class BaseFormulario implements OnInit {
  // utilFuncoes = UtilFuncoes;
  constructor(public dialog: MatDialog, public fb: FormBuilder, public toastr: ToastrService, private customRouter: Router) { }
  form: FormGroup = this.fb.group({})
  modoFormulario = 'home' //modos possíveis: home, cadastro, edicao e consulta
  formSalvarHabilitado: boolean = true;

  exibirBtnFechar: boolean = true;
  exibirBtnCadastrar: boolean = true;
  exibirBtnEditar: boolean = true;
  exibirBtnAdicionar: boolean = true;
  exibirBtnExcluir: boolean = false;
  exibirMatCardActions: boolean = true;

  redirectFechar: string = '/gestao';

  ngOnInit(): void {
    this.home();
  }

  cssBotaoImpressora(): string{
    if(localStorage.getItem('impressoraEtiqueta') == undefined)
      return 'impressoraQZNaoSelecionada';
    else
      return '';
  }

  adicionar(){
    this.form.reset();
    this.form.enable();
    this.modoFormulario = 'cadastro'
    this.formSalvarHabilitado = true;
    this.exibirBtnFechar = false;
  }

  pesquisar(){
    this.consultar();
  }

  editar(){
    this.form.enable();
    this.modoFormulario ='edicao'
    this.formSalvarHabilitado = true;
    this.exibirBtnFechar = false;
  }

  consultar(){
    this.form.disable();
    this.modoFormulario = 'consulta'
    this.exibirBtnFechar = true;
  }

  home(){
    this.form.disable();
    this.modoFormulario = 'home';
    this.exibirBtnFechar = true;
  }


  fechar() {
    this.customRouter.navigate([this.redirectFechar]);
  }

  reverter(){

    const resultado = this.resultadoDialog('Reverter alterações', 'Ao prosseguir, todos os valores alterados serão perdidos. Deseja continuar com a operação?');
    resultado.subscribe((resultadoDialog) => {
      if (resultadoDialog == true) {

        if (this.modoFormulario == 'edicao') {
          this.consultar();
        }

        if (this.modoFormulario == 'cadastro') {
          this.form.reset();
          this.home();
        }
      }
    })
  }

  acaoSalvar(){
    if(this.form.valid){
      this.formSalvarHabilitado = false;
      this.salvar();
      this.formSalvarHabilitado = true;
    }
    else {
      this.exibirBtnFechar = false;
      this.toastr.warning("Verifique os campos em vermelho e tente novamente.")
      this.form.markAllAsTouched();

    }

  }

  acaoPaginator(e: PageEvent) {}

  salvar(){
    this.form.markAsPristine();
    this.form.disable();
    this.consultar();
  }

  public resultadoDialog(titulo: string, corpo: string, qtdBotoes: number = 2) {
    const resultadoDialog = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        titulo: titulo,
        corpo: corpo,
        qtdBotoes: qtdBotoes
      },
    });
    return resultadoDialog.afterClosed();
  }

  canDeactivate(): boolean | Observable<boolean> | UrlTree {
    if (this.modoFormulario == 'edicao' || this.modoFormulario == 'cadastro') {
      return new Observable<boolean>((observer) => {
        this.resultadoDialog('Sair da página atual', 'As alterações no formulário não foram salvas e serão descartadas, deseja prosseguir?')
          .subscribe((resultado) => {
            if (resultado) {
              observer.next(true);
              observer.complete();
            } else {
              observer.next(false);
              observer.complete();
            }
          });
      });
    } else {
      return true;
    }
  }

  getAcaoFormulario(acao: any){
    switch (acao) {
      case 'adicionar':
        this.adicionar();
        break;

      case 'cancelar':
        this.fechar();
        break;

      case 'pesquisar':
        this.pesquisar();
        break

      // case 'editar':
      //   this.editar();
      //   break

      case 'reverter':
        this.reverter();
        break

      case 'salvar':
        this.acaoSalvar();
        break

      default:
        if (acao.tipo == 'paginator') {
          this.acaoPaginator(acao.e)
        }
        break;
    }
  }

}
