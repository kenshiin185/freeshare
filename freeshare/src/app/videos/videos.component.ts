import { Component, OnInit } from '@angular/core';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  tabSources: import("/mnt/c/Projets/freeshare/src/app/class/Sources").Sources[];

  constructor(private srvSources: SourcesService) { }
  
  ngOnInit() {
    this.srvSources.reqDataByType("audio/mp3").subscribe((data) => {
      this.tabSources=data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

}
