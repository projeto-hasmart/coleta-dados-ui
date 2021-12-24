import { Medico } from 'src/app/models/medico';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { filter, map } from 'rxjs/operators';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, ActivationEnd, NavigationEnd, NavigationStart } from '@angular/router';
import { Global } from 'src/app/models/globalConstants';
import { User } from 'src/app/models/user';
import { CsvFile } from 'src/app/models/csvFile';
import { ApiService } from 'src/app/services/api.service';
declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  uploading = false;
  uploadCompleted = false;
  countOfUploaded = 0;
  uploadError;
  searchError;
  apiService: ApiService;
  errorBye = false;
  ativo = true;
  atual: string;
  doWeHaveCitizen = false;
  decidirArrumarSuporte = false;
  routeData;
  user: User;
  User: Medico;
  // tslint:disable-next-line: radix
  idk: string = localStorage.getItem('citizen');
  link_control: boolean;

  inicioClick(){
    return true;
  }

  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadingFileToServer() {
    this.uploading = true;
  }

  uploadFile(files: FileList) {
    this.uploadCompleted = false;
    if (files.length === 0) {
      return;
    }
    const fileToUpload: File = files[0];
    const csv: CsvFile = {
      File: fileToUpload
    };
    this.uploadingFileToServer();
    this.apiService.uploadFile(csv)
      .subscribe(
        res => {
          this.uploadCompleted = true;
          this.uploading = false;
          this.countOfUploaded = res.length;
        },
        err => {
          this.uploading = false;
          this.errorBye = true;
          if (err.status === 500) { // api deveria retornar o que está errado
            this.uploadError = ('Erro no upload, por favor verifique se o arquivo segue o padrão adotado pelo projeto.\n'
              + 'Caso siga, entre em contato com os desenvolvedores e informe erro 500 e tire uma foto do que está abaixo: \n'
              + 'Mensagem: ' + err.message
              + '\nNome do erro: ' + err.name);
          } else {
            this.uploadError = ('Erro desconhecido no upload.\n'
              + 'Entre em contato com os desenvolvedores e informe o erro e tire uma foto do que está abaixo:\n '
              + 'Mensagem: ' + err.message
              + '\nNome do erro: ' + err.name);
          }
        }
      );
  }

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               idk: CidadaoServiceService) {
                 this.idk = idk.selecionadoId;
               }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('currentUser')) as Medico;
    this.navigationEnd();
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  navigationEnd(){
    console.log(this.router.url);
    if(this.router.url == 'cidadaos/cadastrar'){
      this.router.events
      .subscribe(event => {
        if(event instanceof NavigationStart){
          console.log(this.router.url);
          console.log('start');
        }
      });
  }
  };

  removeCitizen() {
    localStorage.removeItem('citizen');
  }

  refresh(): void {
    window.location.reload();
}
}
