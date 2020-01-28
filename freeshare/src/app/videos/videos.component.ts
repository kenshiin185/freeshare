import { Component, OnInit } from '@angular/core';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';
import {environment } from 'src/environments/environment';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  tabSources: Sources[];
 // tabSources: import("/mnt/c/Projets/freeshare/src/app/class/Sources").Sources[];

  constructor(private srvSources: SourcesService) { }
  
  ngOnInit() {
    this.srvSources.reqDataByType("video/mp4").subscribe((data) => {
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
}
