import {Component} from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'tables-cmp',
	templateUrl: 'tables.component.html'
})

export class TableComponent {
  settings = {
    columns: {
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      group: {
        title: 'Group'
      }
    }
  };

  data = [

  ]
}
