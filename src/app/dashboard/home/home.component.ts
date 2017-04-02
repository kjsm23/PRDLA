import { Component } from '@angular/core';

/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'timeline-cmp',
	templateUrl: 'timeline.html',
	styleUrls: ['timeline.scss'],
})
export class TimelineComponent { }

@Component({
	moduleId: module.id,
	selector: 'chat-cmp',
	templateUrl: 'chat.html'
})
export class ChatComponent {}

@Component({
	moduleId: module.id,
	selector: 'notifications-cmp',
	templateUrl: 'notifications.html'
})
export class NotificationComponent { }

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html',
  styleUrls:['home.component.css']
})

export class HomeComponent {
	/* Carousel Variable */
	myInterval: number = 5000;
	index: number = 0;
	slides: Array<any> = [];
	imgUrl: Array<any> = [
		`assets/img/slider1.jpg`,
		`assets/img/slider2.jpg`,
		`assets/img/slider3.jpg`,
		`assets/img/slider0.jpg`
	];
	/* END */
	/* Alert component */


	constructor() {
		for (let i = 0; i < 4; i++) {
			this.addSlide();
		}
	}

	/* Carousel */
	addSlide() {
		let i = this.slides.length;
		this.slides.push({
			image: this.imgUrl[i],
			text: `${['Dummy ', 'Dummy ', 'Dummy ', 'Dummy '][this.slides.length % 4]}
      			${['text 0', 'text 1', 'text 2', 'text 3'][this.slides.length % 4]}`
		});
	}
	/* END */
}
