import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  titulo: string;
  corpo: string;
  qtdBotoes: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.titulo = data.titulo;
    this.corpo = data.corpo;
    this.qtdBotoes = data.qtdBotoes;
  }

  ngOnInit() {
  }

}
