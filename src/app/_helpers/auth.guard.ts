
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import swal from 'sweetalert';
import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        const action = route.data;
        if (action && user.UserId !== 'superadmin') {
            if (action.param === 'Add') {
                if (user.UserRights.indexOf(action.param) == -1) {
                    swal('', 'You are not authorized to Create New Record', 'error');
                    return;
                }
            } else if (action.param === 'Edit') {
                if (user.UserRights.indexOf(action.param) == -1) {
                    swal('', 'You are not authorized to Edit Record', 'error');
                    return;
                }
            } else if (action.param === 'Delete') {
                if (user.UserRights.indexOf(action.param) == -1) {
                    swal('', 'You are not authorized to Delete Record', 'error');
                    return;
                }
            } else if (action.param === 'View') {
                if (user.UserRights.indexOf(action.param) == -1) {
                    swal('', 'You are not authorized to View Record', 'error');
                    return;
                }
            }
        }

        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
