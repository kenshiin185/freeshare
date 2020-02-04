import { Component, OnInit } from '@angular/core';
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public currentService: FrmCurrentServiceService, public router: Router) { }

  ngOnInit() {
  }
  public get messgbtn(): string {
    if (this.currentService.isLoged) {
      return "Deconnexion";
    }
    return "Connexion";
  }
  public navig() {
    if (!this.currentService.isLoged) {

      this.router.navigate(['/connection']);
    } else {
      this.currentService.token = "";
    }

  }
  public useraccess():boolean{
    if (this.currentService.token){
      return true;
    } else{
      return false;
    }
  }

}// fin de class
