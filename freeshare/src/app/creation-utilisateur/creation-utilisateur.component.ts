import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Utilisateurs } from '../class/Utilisateur';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.css']
})
export class CreationUtilisateurComponent implements OnInit {
  formCreateAuth: FormGroup = new FormGroup(
    {
      identifiant: new FormControl("", [Validators.required]),
      mail: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    }
  );

  constructor(private comm: CommConnectionUtilisateurService,private router: Router) { }

  ngOnInit() {
  }
  onValidateFormCreate() {
    console.log("validate formulaire");
    console.log(this.formCreateAuth.value);
    let CreateWrk: Utilisateurs = new Utilisateurs();
    CreateWrk.pseudo = this.formCreateAuth.value.identifiant;
    CreateWrk.mail = this.formCreateAuth.value.mail;
    CreateWrk.password = this.formCreateAuth.value.password;
    this.comm.CreationUtilisateur(CreateWrk).subscribe(
      (data: Utilisateurs) => {
        console.log(data);
        this.router.navigate(["/connection"]);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}



