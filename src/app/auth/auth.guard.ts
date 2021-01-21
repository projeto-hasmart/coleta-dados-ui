import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private apiService: ApiService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
      if (currentUser !== null) {
        if (currentUser.role !== Role.Medico || currentUser === null || currentUser === undefined) {
          this.router.navigate(['login/medico']);
          return false;
      } else {
        return true;
      }
      } else {
        this.router.navigate(['login/medico']);
        return false;
      }

      // // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      // return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
