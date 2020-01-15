import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Partage } from '../class/partage';

@Component({
  selector: 'app-partager',
  templateUrl: './partager.component.html',
  styleUrls: ['./partager.component.css']
})
export class PartagerComponent implements OnInit {
  formShare: FormGroup = new FormGroup(
    {
      titre: new FormControl("", [Validators.required]),
      categorie: new FormControl("", [Validators.required])
    }
  );
  comm: any;
  constructor() { }

  ngOnInit() {
  }
  onValidateFormShare(){
    console.log("validate formulaire");
    console.log(this.formShare.value);
    let shareWrk: Partage = new Partage();
    shareWrk.title = this.formShare.value.identifiant;
    shareWrk.categorie = this.formShare.value.password;
    this.comm.login(shareWrk).subscribe(
      (data: Partage) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

