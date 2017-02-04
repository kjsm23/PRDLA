/**
 * Created by --- on 1/18/2017.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotoComponent } from './photo.component';
import { PhotoCommentComponent } from './photo-comment.component';
import { PhotoResolver } from './photo-resolver.service';
import { MarkdownPipe } from './markdown.pipe';


import { SharedModule } from '../shared';

const photoRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'photo/:slug',
    component: PhotoComponent,
    resolve:{
      photo: PhotoResolver
    }
  }
]);

@NgModule({
  imports: [
    photoRouting,
    SharedModule
  ],
  declarations: [
    PhotoComponent,
    PhotoCommentComponent,
    MarkdownPipe,
    
  ],
  providers: [
   PhotoResolver
  ]
})
export class PhotoModule {}
