import { Component, Input } from '@angular/core';
import { IWaypoint } from '../shared/models/IWaypoint';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Input() position = { x: 0, y: 0 };
  showStory = true;

  route1: IWaypoint[] = [
    { id: 0, name: 'start', x: 244, y: 25 },
    { id: 1, name: 'ch1', x: 244, y: 119 },
    { id: 2, name: 'ch2', x: 244, y: 210 },
    { id: 3, name: 'ch3', x: 150, y: 210 },
    { id: 4, name: 'ch4a', x: 50, y: 210 },
    { id: 5, name: 'ch5a', x: 50, y: 305 },
    { id: 6, name: 'ch6a', x: 50, y: 400 },
    { id: 7, name: 'ch7a', x: 50, y: 495 },
    { id: 8, name: 'ch8a', x: 147, y: 495 },
    { id: 9, name: 'finish', x: 147, y: 585 },
  ];

  route2: IWaypoint[] = [
    { id: 0, name: 'start', x: 244, y: 25 },
    { id: 1, name: 'ch1', x: 244, y: 119 },
    { id: 2, name: 'ch2', x: 244, y: 210 },
    { id: 3, name: 'ch3', x: 150, y: 210 },
    { id: 4, name: 'ch4b', x: 143, y: 301 },
    { id: 5, name: 'ch5b', x: 243, y: 301 },
    { id: 6, name: 'ch6b', x: 243, y: 395 },
    { id: 7, name: 'ch7b', x: 243, y: 490 },
    { id: 8, name: 'ch8b', x: 243, y: 585 },
    { id: 9, name: 'finish', x: 147, y: 585 },
  ];

  route = this.route2;

  currentWaypoint: IWaypoint = this.route[0];

  moveAvatar(): void {
    let nextWaypoint = this.route[this.currentWaypoint.id + 1];

    if (nextWaypoint == undefined) return;
    console.log(nextWaypoint.y + ' ' + this.currentWaypoint.y);

    let x = nextWaypoint.x - this.currentWaypoint.x;
    let y = nextWaypoint.y - this.currentWaypoint.y;

    console.log(x + ' ' + y);

    this.position.y += x;
    this.position.x += y;

    this.currentWaypoint = nextWaypoint;
  }

  closeStory(): void {
    this.showStory = false;
  }
}
