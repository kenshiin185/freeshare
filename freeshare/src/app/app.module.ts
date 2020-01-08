import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
