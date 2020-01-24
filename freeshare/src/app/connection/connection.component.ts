import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { AuthUtilisateur } from '../class/authutilisateur';
import { RepAuth } from '../class/rep';
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  formAuth: FormGroup = new FormGroup(
    {
      identifiant: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    }
  );
  constructor(private comm: CommConnectionUtilisateurService, private currentUser: FrmCurrentServiceService,
     private router: Router) { }

  ngOnInit() {
  }
  onValidateForm() {
    console.log("validate formulaire");
    console.log(this.formAuth.value);
    let authWrk: AuthUtilisateur = new AuthUtilisateur();
    authWrk.identifiant = this.formAuth.value.identifiant;
    authWrk.password = this.formAuth.value.password;
    this.comm.login(authWrk).subscribe(
      (data: RepAuth) => {
        console.log(data);
        this.currentUser.token = data.token;
        this.router.navigate(["/accueil"]);
      },
      (err) => {
        console.log(err);
        this.currentUser.token = "";
      }
    )
  }
}

