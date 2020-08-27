import { Component, OnInit } from '@angular/core';
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateurs } from '../class/Utilisateur';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  navbarOpen = false;
  currentuser: Utilisateurs[]=[];
  user: Utilisateurs;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public currentService: FrmCurrentServiceService, public router: Router,private srvUtilisateur: UtilisateurService) { }

  ngOnInit() {
    this.srvUtilisateur.reqPseudoById(this.currentService.id).subscribe((data) => {
      this.user = data;
      console.log(data);
    });

   
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
      this.router.navigate(['/accueil']);
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
