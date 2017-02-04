/**
 * Created by --- on 1/22/2017.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditablePhotoResolver } from './editable-article-resolver.service';
import { AuthGuard, SharedModule } from '../shared';
import { FileUploadSectionComponent } from './file-upload/file-upload-section';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { PanoComponent } from './pano/pano.component';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      photo: EditablePhotoResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule

  ],
  declarations: [
    EditorComponent,
    FileUploadSectionComponent,
    FileSelectDirective,
    PanoComponent
  ],
  providers: [
    EditablePhotoResolver
  ]
})
export class EditorModule {}
