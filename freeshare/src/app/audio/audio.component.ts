import { Component, OnInit } from '@angular/core';
import { Sources } from '../class/Sources';
import { SourcesService } from '../sources.service';
import { environment} from 'src/environments/environment';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private srvSources: SourcesService) { }
  tabSources: Sources[] = [];
  ngOnInit() {
  
  this.srvSources.reqDataByType("audio/mp3").subscribe((data) => {
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
