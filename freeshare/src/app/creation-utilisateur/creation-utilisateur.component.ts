import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { RepAuth } from '../class/rep';
import { CreateUtilisateur } from '../class/CreateUtilisateur';

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.css']
})
export class CreationUtilisateurComponent implements OnInit {
formCreateAuth: FormGroup= new FormGroup(
{
  identifiant: new FormControl("", [Validators.required]),
  mail: new FormControl("", [Validators.required]),
  password: new FormControl("", [Validators.required]),
}
);
  comm: any;
  constructor() { }

  ngOnInit() {
  }
  onValidateFormCreate() {
    console.log("validate formulaire");
    console.log(this.formCreateAuth.value);
    let CreateWrk: CreateUtilisateur = new CreateUtilisateur();
    CreateWrk.identifiant = this.formCreateAuth.value.identifiant;
    CreateWrk.mail = this.formCreateAuth.value.mail;
    CreateWrk.password = this.formCreateAuth.value.password;
    this.comm.login(CreateWrk).subscribe(
      (data: RepAuth) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}



