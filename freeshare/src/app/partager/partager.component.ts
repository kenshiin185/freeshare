import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Partage } from '../class/partage';
import { HttpClient } from '@angular/common/http';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';
import { Route, Router } from '@angular/router';
import { environment} from 'src/environments/environment';

@Component({
  selector: 'app-partager',
  templateUrl: './partager.component.html',
  styleUrls: ['./partager.component.css']
})
export class PartagerComponent implements OnInit {
  formShare: FormGroup = new FormGroup(
    {
      titre: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])

    }
  );
  idrecu: string = "";
  owner: string;

  constructor(private http: HttpClient, private comm: SourcesService, private route: Router) { }

  ngOnInit() {
  }
  onValidateFormShare() {
    console.log("validate formulaire");
    console.log(this.formShare.value);

    const shareWrk: Sources = new Sources();
    shareWrk.title = this.formShare.value.titre;
    shareWrk.description = this.formShare.value.description;
    shareWrk._id = this.idrecu;


    this.comm.reqUpdateSrc(shareWrk).subscribe(
      () => {
        console.log("mise à jour réussi");
        this.route.navigate([""]);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onUpload(files: File[]) {
    console.log(files)
    var formData: FormData = new FormData();
    for (const fl of files) {
      formData.append('file', fl);
    }
    const url: string = `${environment.retBaseUrl}/uploadF`;
    this.http.post<any>(url, formData).subscribe((rep) => {
      console.log(rep);
      this.idrecu = rep._id;
    });
  }


  public get isValid(): boolean {
    if (this.formShare.valid && this.idrecu != "") {
      return true;
    } else {
      return false;
    }
  }
}

