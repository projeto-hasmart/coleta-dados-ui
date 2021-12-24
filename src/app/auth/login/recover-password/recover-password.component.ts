import { FormGroup } from '@angular/forms';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MedicoService } from './../../../services/medico/medico.service';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  dados:any;
  input_nome = false;
  input_crm = false;
  input_pw = false;
  input_email = false;
  hideModal = false;

  constructor(private medicoService:MedicoService,) {
    this.dados = {};
  }
  ngOnInit() {
  }

  onCheckEmpty(){
    let nome = (document.getElementById('nomeLabel') as HTMLInputElement).value;
    let crm = (document.getElementById('crmLabel') as HTMLInputElement).value;
    let pw = (document.getElementById('pwLabel') as HTMLInputElement).value;
    let email = (document.getElementById('emailLabel') as HTMLInputElement).value;
    if(nome === '' || nome === null || nome === undefined){
      this.input_nome = true;
    } else {this.input_nome = false;};
    if(crm === '' || crm === null || crm === undefined){
      this.input_crm = true;
    } else {this.input_crm = false;};
    if(pw === '' || pw === null || pw === undefined){
      this.input_pw = true;
    } else {this.input_pw = false;};
    if(email === '' || email === null || email === undefined){
      this.input_email = true;
    } else {this.input_email = false;};
  }

  onAlterarSenha(frm:FormGroup){
    this.onCheckEmpty();
    this.medicoService.modifyPassword(this.dados.nome, this.dados.crm, this.dados.new_pw, this.dados.email).subscribe(data => {
      console.log('sucess');
      frm.reset
    }, error =>{
      console.error('Error: ',error);
    });
    this.hideModal = true;
  }
}
