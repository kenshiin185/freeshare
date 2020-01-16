import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trans-file',
  templateUrl: './trans-file.component.html',
  styleUrls: ['./trans-file.component.css']
})
export class TransFileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onUpload(files: File[]) {
    console.log(files)
    var formData: FormData = new FormData();
    for (const fl of files) {
      formData.append('file', fl);
    }
    const url: string = "http://localhost:3000/uploadF";
    this.http.post(url, formData).subscribe((rep) => {
      console.log(rep);
    });
  }



}
