import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [RouterModule,Ng2SmartTableModule],
    declarations: [TableComponent],
    exports: [TableComponent]
})

export class TableModule { }
