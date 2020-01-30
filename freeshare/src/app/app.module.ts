import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { Top3Component } from './top3/top3.component';
import { VideosComponent } from './videos/videos.component';
import { AudioComponent } from './audio/audio.component';
import { PhotosComponent } from './photos/photos.component';
import { PartagerComponent } from './partager/partager.component';
import { Top10Component } from './top10/top10.component';
import { CreationUtilisateurComponent } from './creation-utilisateur/creation-utilisateur.component';
import { FooterComponent } from './footer/footer.component';
import { ConnectionComponent } from './connection/connection.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AlertModule} from 'ngx-bootstrap';
import { SecurityInterceptorService } from './services/security-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    Top3Component,
    VideosComponent,
    AudioComponent,
    PhotosComponent,
    PartagerComponent,
    Top10Component,
    CreationUtilisateurComponent,
    FooterComponent,
    ConnectionComponent,

    UserPageComponent,

    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
