import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  constructor(private toastr: ToastrService) {

  }

  ngOnInit() {
    this.toastr.success("Entrou")
  }

}
