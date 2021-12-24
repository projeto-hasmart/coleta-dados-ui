import { MedicloginComponent } from './mediclogin/mediclogin.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AuthGuard } from './auth.guard';
import { RecoverPasswordComponent } from './login/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [

      {path: '', component: LoginComponent},

    ]
  },
  {
    path: 'medico', component: AuthComponent, children: [
      {path: '', component: MedicloginComponent
    },

    ]
  },
  {path:'recuperar-senha', component:RecoverPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
