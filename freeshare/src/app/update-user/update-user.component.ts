import { Component, OnInit } from '@angular/core';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';

import { Utilisateurs } from '../class/Utilisateur';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilisateurService} from '../utilisateur.service'
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';
import { SourcesService } from '../sources.service';
import { environment } from 'src/environments/environment';
import { Sources } from '../class/Sources';
import { stringify } from 'querystring';


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
  user: Utilisateurs;
  tabSources:any;
  currentService: any;
  userShareData: Sources[];
  
  id: string;
  userShareDataAudio: Sources[];
  userShareDataVideo: Sources[];
  userShareDataApk: Sources[];
  
  constructor(private srvSources: SourcesService,private comm: CommConnectionUtilisateurService,private srvUtilisateur: UtilisateurService,
    private currentuser: FrmCurrentServiceService,private router: Router
    ) { }

  ngOnInit() {
   
   this.srvSources.reqDataByOwner(this.currentuser.id).subscribe((data) => {
     this.userShareData=data;
     console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.srvSources.reqDataByOwnerAudio(this.currentuser.id).subscribe((data) => {
      this.userShareDataAudio=data;
      console.log(data);
     }, (error) => {
       console.log(error);
     });

     this.srvSources.reqDataByOwnerVideo(this.currentuser.id).subscribe((data) => {
      this.userShareDataVideo=data;
      console.log(data);
     }, (error) => {
       console.log(error);
     });

     this.srvSources.reqDataByOwnerApk(this.currentuser.id).subscribe((data) => {
      this.userShareDataApk=data;
      console.log(data);
     }, (error) => {
       console.log(error);
     });
      
    /*********************************************************************/
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
    UpdtWrk.rgpd = true;
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

  /***************************************************************/
  /*public delData(){
    let delWrk : Sources = new Sources();
  
    this.srvSources.reqSupThisData(this.tabSources.id,delWrk).subscribe(
      (data) => {
        alert(data);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }*/
/*************************************************************** */
buildUrlImg(buildI: string): string {
  return `${environment.retBaseUrl}/api/images/${buildI}`;
}

buildUrlHref(buildH: string): string {
  return `${environment.retBaseUrl}/download/${buildH}?attachment=true`;
}

public useraccess():boolean{
  if (this.currentService.token){
    return true;
  } else{
    return false;
  }
}
}
