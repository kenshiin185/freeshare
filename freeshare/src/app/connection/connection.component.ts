import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { AuthUtilisateur } from '../class/authutilisateur';
import { RepAuth } from '../class/rep';
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  loading = false;
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
    this.loading = true;
    console.log("validate formulaire");
    console.log(this.formAuth.value);
    let authWrk: AuthUtilisateur = new AuthUtilisateur();
    authWrk.identifiant = this.formAuth.value.identifiant;
    authWrk.password = this.formAuth.value.password;
    this.comm.login(authWrk).subscribe(
      (data: RepAuth) => {
        console.log(data);
        this.currentUser.token = data.token;
        this.currentUser.id = data.id;
        this.loading = false;
        this.router.navigate(["/accueil"]);
      },
      (err) => {
        this.loading = false;
        console.log(err);
        this.currentUser.token = "";
        this.validation = true;
      }
    )
    
  }

  validation: boolean = false;

}

