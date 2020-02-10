import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';
import { environment} from 'src/environments/environment';
import { FrmCurrentServiceService } from '../frm-current-service.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  http: any;
  idrecu: any;

  constructor(private srvSources: SourcesService,public currentService: FrmCurrentServiceService) { }
  
  tabSources: Sources[] = [];

  ngOnInit() {
    

    this.srvSources.reqDataByTypeLike("image").subscribe((data) => {
      this.tabSources=data;
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

  public useraccess():boolean{
    if (this.currentService.token){
      return true;
    } else{
      return false;
    }
  }

}
