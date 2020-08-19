import { Component, OnInit } from '@angular/core';
import { Sources } from '../class/Sources';
import { SourcesService } from '../sources.service';
import { environment } from 'src/environments/environment';
import { FrmCurrentServiceService } from '../frm-current-service.service';
@Component({
  selector: 'app-application-android',
  templateUrl: './application-android.component.html',
  styleUrls: ['./application-android.component.css']
})
export class ApplicationAndroidComponent implements OnInit {

  constructor(private srvSources: SourcesService,public currentService: FrmCurrentServiceService) { }
  tabSources: Sources[] = [];
  
  ngOnInit() {

    
    this.srvSources.reqDataByType("application/vnd.android.package-archive").subscribe((data) => {
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

  public useraccess():boolean{
    if (this.currentService.token){
      return true;
    } else{
      return false;
    }
  }
}
