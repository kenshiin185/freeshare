import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Top10Component } from './top10/top10.component';
import { PartagerComponent } from './partager/partager.component';
import { PhotosComponent } from './photos/photos.component';
import { AudioComponent } from './audio/audio.component';
import { CreationUtilisateurComponent } from './creation-utilisateur/creation-utilisateur.component';
import { ConnectionComponent } from './connection/connection.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';



const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'creation-utilisateur', component: CreationUtilisateurComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'partager', component: PartagerComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'top10', component: Top10Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
