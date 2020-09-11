import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private apiService: ApiService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.apiService.user;
      if (currentUser) {
          // check if route is restricted by role
          if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
              // role not authorised so redirect to home page
              this.router.navigate(['/inicio']);
              return false;
          }

          // authorised so return true
          return true;
      } else {
        return true;
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
