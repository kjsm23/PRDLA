/**
 * Created by --- on 1/22/2017.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditablePhotoResolver } from './editable-article-resolver.service';
import { AuthGuard, SharedModule } from '../shared';
import { FileUploadSectionComponent } from './file-upload/file-upload-section';
import { FileUploadModule } from 'ng2-file-upload';

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
    SharedModule,
    FileUploadModule

  ],
  declarations: [
    EditorComponent,
    FileUploadSectionComponent
  ],
  providers: [
    EditablePhotoResolver
  ]
})
export class EditorModule {}
