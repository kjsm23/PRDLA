import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {EditorModule} from './editor/editor.module';
import { HomeModule } from './home/home.module';
import {PhotoModule} from './photo/photo.module';
import {ProfileModule} from './profile/profile.module';
import {SettingsModule} from './settings/settings.module';

import{
  ApiService,
  AuthGuard,
  CommentsService,
  FooterComponent,
  GeocodingService,
  HeaderComponent,
  MapService,
  JwtService,
  PhotosService,
  ProfilesService,
  SharedModule,
  UserService
}from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    HomeModule,
    EditorModule,
    PhotoModule,
    ProfileModule,
    SharedModule,
    rootRouting,
    SettingsModule

  ],
  providers: [
    ApiService,
    AuthGuard,
    CommentsService,
    GeocodingService,
    JwtService,
    MapService,
    PhotosService,
    ProfilesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
