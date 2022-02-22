import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CsvFile } from 'src/app/models/csvFile';
import { ApiService } from 'src/app/services/api.service';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {
  uploading = false;
  uploadCompleted = false;
  countOfUploaded = 0;
  uploadError;
  searchError;
  apiService: ApiService;
  errorBye = false;
  ativo = true;
  isMobile;
  deviceInfo = null;
  innerWidth;
  innerHeight;
  button_color = 'inicio';
  User: Medico;

  constructor( private http: HttpClient, private deviceService: DeviceDetectorService, private router: Router) {
    this.epicFunction();
  }
  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('currentUser')) as Medico;
    // this.router.events.subscribe((url:any) => console.log(url));
    if(this.router.url == 'cidadaos/cadastrar'){
      console.log('aqui');
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
}
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
  }

  buttonInicioColor(){
    this.button_color = 'inicio';
  }
  buttonCidadaoColor(){
    this.button_color = 'cidadao';
  }
  buttonRegistroColor(){
    this.button_color = 'registro';
  }
  buttonImportarColor(){
    this.button_color = 'importar';
  }


  removeCitizen() {
    localStorage.removeItem('citizen');
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

}
