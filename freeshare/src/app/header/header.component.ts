import { Component, OnInit } from '@angular/core';
import { FrmCurrentServiceService } from '../frm-current-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public currentService: FrmCurrentServiceService, public router: Router) { }

  ngOnInit() {
  }
  public get messgbtn(): string {
    if (this.currentService.isLoged) {
      return "Deconnection";
    }
    return "Connection";
  }
  public navig() {
    if (!this.currentService.isLoged) {

      this.router.navigate(['/connection']);
    } else {
      this.currentService.token = "";
    }

  }

}// fin de class
