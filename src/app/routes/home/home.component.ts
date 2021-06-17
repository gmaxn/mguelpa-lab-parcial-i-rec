import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any = {
    login: "",
    avatar_url:"",
    url:"",
    html_url:""
  };

  constructor(private gs: GitService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initProfile();
  }

  initProfile(): void {
    this.gs.getProfile().subscribe({
      next: response => {
        this.profile = response;
      },
      error: err => alert(err)
    });
  }

}
