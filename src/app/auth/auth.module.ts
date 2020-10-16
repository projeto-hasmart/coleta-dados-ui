import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MedicloginComponent } from './mediclogin/mediclogin.component';



@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, MedicloginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class AuthModule {
}
