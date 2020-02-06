import { Component, OnInit } from '@angular/core';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';

import { Utilisateurs } from '../class/Utilisateur';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilisateurService} from '../utilisateur.service'
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  

  formModifUser: FormGroup = new FormGroup(
    {
      identifiant: new FormControl("", [Validators.required]),
      mail: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    }
  );
  constructor(private comm: CommConnectionUtilisateurService,private srvUtilisateur: UtilisateurService,
    private currentuser: FrmCurrentServiceService,private router: Router
    ) { }

  ngOnInit() {
   
      
    
    this.srvUtilisateur.reqDataByUserId(this.currentuser.id).subscribe((data) => {
      
      this.formModifUser.controls['identifiant'].setValue(data.pseudo);
      this.formModifUser.controls['mail'].setValue(data.mail);
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
  onValidateFormModif() {
    console.log("validate formulaire");
    console.log(this.formModifUser.value);
    let UpdtWrk: Utilisateurs = new Utilisateurs();
    UpdtWrk.pseudo = this.formModifUser.value.identifiant;
    UpdtWrk.mail = this.formModifUser.value.mail;
    UpdtWrk.password = this.formModifUser.value.password;
    this.srvUtilisateur.reqDataUpdate(this.currentuser.id,UpdtWrk).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/accueil"]);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public supuser(){
    let UpdtWrk: Utilisateurs = new Utilisateurs();
   
    this.srvUtilisateur.reqDataSupUser(this.currentuser.id,UpdtWrk).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/accueil"]);
        this.currentuser.token="";
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
