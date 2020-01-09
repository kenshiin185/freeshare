import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { AuthUtilisateur } from '../class/authutilisateur';
import { RepAuth } from '../class/rep';

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
  constructor(private comm: CommConnectionUtilisateurService) { }

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
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

