import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  currentUser: any;
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';

  @Output() sidenavClose = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ngOnInit() {
    var localUser = localStorage.getItem('currentUser');
    if (!localUser) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }else{
      this.currentUser = JSON.parse(localUser);
    }
  }

  logout() {
    swal({

      text: "Are you sure to logout from application?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        ok: "OK"
      }
    } as any)
      .then((willDelete) => {
        if (willDelete) {
          this.authenticationService.logout();
          this.sidenavClose.emit();
          swal('','Logout sucessfully','success');
          this.router.navigate(['/login']);
        }
      });

  }

}
