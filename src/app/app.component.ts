import { Component } from '@angular/core';
import { sideNavAnimation } from './app-animations.module';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  animations: [ sideNavAnimation ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mguelpa-lab-iv-parcial-i';
  public sidenav = false;
  public loading = false;
  public logged = false;

  constructor(
    private auth: AuthenticationService
  ) {
    this.auth.logged$.subscribe(logged => {
      this.logged = logged;
    })
  }
  onLogout(logged:boolean) {
    this.auth.signOut();
    this.logged = logged;
  }
  toggleSidenav(toggle:boolean) {
    this.sidenav = this.sidenav ? !this.sidenav : toggle;
  }

}