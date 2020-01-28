import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommConnectionUtilisateurService } from '../comm-connection-utilisateur.service';
import { AuthUtilisateur } from '../class/authutilisateur';
import { RepAuth } from '../class/rep';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private comm: CommConnectionUtilisateurService,
    private srvSources: SourcesService) { }

  tabSources: Sources[] = [];

  ngOnInit() {
    this.srvSources.reqDataByLastPost("image").subscribe((data) => {
      this.tabSources = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });


  }

  buildUrlImg(buildI: string): string {
    return `${environment.retBaseUrl}/api/images/${buildI}`;
  }

  buildUrlHref(buildH: string): string {
    return `${environment.retBaseUrl}/download/${buildH}?attachment=true`;
  }

}
