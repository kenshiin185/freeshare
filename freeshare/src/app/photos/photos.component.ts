import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourcesService } from '../sources.service';
import { Sources } from '../class/Sources';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private srvSources: SourcesService) { }
  
  tabSources: Sources[] = [];

  ngOnInit() {
    /*this.srvSources.reqDataByOwner("abctoto").subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });*/

    this.srvSources.reqDataByType("image/jpeg").subscribe((data) => {
      this.tabSources=data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });

  }

}
