import { Component, OnInit, TemplateRef } from '@angular/core';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';
import { BsModalService } from 'ngx-bootstrap';
import { Utilisateurs } from '../class/Utilisateur';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  modalRef: any;
  modalRef2: any;
  router: any;
 
  formModifUser: FormGroup = new FormGroup(
    {
      identifiant: new FormControl("", [Validators.required]),
      mail: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    }
  );
 

  constructor(private comm: CommConnectionUtilisateurService,private srvSources: SourcesService,
    private modalService: BsModalService ) { }
  tabSources: Sources[] = [];
  ngOnInit() {
    this.formModifUser.controls['identifiant'].setValue("string")
    this.srvSources.reqDataByPseudo('Bruno').subscribe((data) => {
      this.tabSources = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
  onValidateFormModif() {
    console.log("validate formulaire");
    console.log(this.formModifUser.value);
    let CreateWrk: Utilisateurs = new Utilisateurs();
    CreateWrk.pseudo = this.formModifUser.value.identifiant;
    CreateWrk.mail = this.formModifUser.value.mail;
    CreateWrk.password = this.formModifUser.value.password;
    this.comm.CreationUtilisateur(CreateWrk).subscribe(
      (data: Utilisateurs) => {
        console.log(data);
        this.router.navigate(["/accueil"]);
      },
      (err) => {
        console.log(err);
      }
    )
  }
// gestion modal
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
}
openModal2(template: TemplateRef<any>) {
  this.modalRef2 = this.modalService.show(template, { class: 'second' });
}
closeFirstModal() {
  if (!this.modalRef) {
    return;
  }

  this.modalRef.hide();
  this.modalRef = null;
}

}


