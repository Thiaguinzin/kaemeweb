import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
//import { Observable } from '../../../../node_modules/rxjs';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AcessGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (localStorage.getItem('k_user_perfil_id') == "1" ) {
            return true;
        } else {
            this.router.navigate(['/gestao']);
            return false;
        }
    }
}
