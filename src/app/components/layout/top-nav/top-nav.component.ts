import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() sidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() logout: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input() logged: boolean = false;



  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  signin() { 
    this.router.navigate(['/signin'])
  }

  signup() {
    this.router.navigate(['/signin'])
  }

  signout() { 
    this.router.navigate(['/bienvenida']);
    this.logout.emit(false);
  }

  shownav() {
    this.sidenav.emit(true);
  }
}