import { Injectable }     from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { AuthService }    from './auth.service';

@Injectable()
export class TrustedGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.auth.loadUser().then(
      (user) => {
        if (!user.isTrusted()) {
          this.router.navigate(['403']);
        }
        return Promise.resolve(user.isTrusted());
      }
    );

  }
}
