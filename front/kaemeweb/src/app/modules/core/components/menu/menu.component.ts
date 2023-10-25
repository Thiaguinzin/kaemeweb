import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  @ViewChild(MatAccordion) accordion: MatAccordion;
  mostraMenu = false;

  perfil_id = localStorage.getItem('k_user_perfil_id');

  constructor(private dialog: MatDialog,
    private usuarioService: UserService,
    private router: Router) { }

  ngOnInit() {
    // console.log(this.perfil_id)
  }

  public logout() {
    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: this.tituloLogout(),
        corpo: this.corpoLogout(),
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.usuarioService.logout();
        this.router.navigateByUrl('/login');
      }
    })
  }

  abreMenu() {
    this.mostraMenu = !this.mostraMenu;
    if (!this.mostraMenu)
      this.recolheAccordion();
  }

  public tituloLogout(): string {
    return "Sair";
  }

  public corpoLogout(): string {
    return "Tem certeza que deseja sair da conta?";
  }

  selecionaOpcao(){
    this.recolheAccordion();
    this.mostraMenu = false;
  }

  recolheAccordion(){
    const opcoesAbertas = document.getElementsByClassName("mat-expanded");
    for (let index = 0; index < opcoesAbertas.length; index++) {
      const opcaoAberta = <HTMLElement> opcoesAbertas[index];
      opcaoAberta.click();
    }
  }

}
