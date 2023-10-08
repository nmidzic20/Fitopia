import { Component, Input } from '@angular/core';
import { IWaypoint } from '../shared/models/IWaypoint';
import { chapters } from '../shared/models/IChapter';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Input() position = { x: 0, y: 0 };
  showStory = false;
  storyText: string | null = chapters[0];
  imageUrl = '../../assets/start.jpg';
  steps: number | undefined;

  constructor(private userService: UsersService) {
    //this.getSteps();
    //this.checkSteps();
  }

  async getSteps() {
    this.steps = await this.userService.getFitnessData();
  }

  checkSteps() {
    console.log(this.steps);
    if (this.steps! >= 10000) {
      this.moveAvatar();
    }
  }

  route1: IWaypoint[] = [
    {
      id: 0,
      name: 'start',
      x: 244,
      y: 25,
      imageUrl: '../../assets/start.jpg',
      chapter: chapters[0],
    },
    {
      id: 1,
      name: 'ch1',
      x: 244,
      y: 119,
      imageUrl: '../../assets/ch1.jpg',
      chapter: chapters[1],
    },
    {
      id: 2,
      name: 'ch2',
      x: 244,
      y: 210,
      imageUrl: '../../assets/ch2.jpg',
      chapter: chapters[2],
    },
    {
      id: 3,
      name: 'ch3',
      x: 150,
      y: 210,
      imageUrl: '../../assets/ch3.jpg',
      chapter: chapters[3],
    },
    {
      id: 4,
      name: 'ch4a',
      x: 50,
      y: 210,
      imageUrl: '../../assets/ch4a.jpg',
      chapter: chapters[4],
    },
    {
      id: 5,
      name: 'ch5a',
      x: 50,
      y: 305,
      imageUrl: '../../assets/ch5a.jpg',
      chapter: chapters[5],
    },
    {
      id: 6,
      name: 'ch6a',
      x: 50,
      y: 400,
      imageUrl: '../../assets/ch7.png',
      chapter: chapters[6],
    },
    {
      id: 7,
      name: 'ch7a',
      x: 50,
      y: 495,
      imageUrl: '../../assets/ch8.png',
      chapter: chapters[7],
    },
    {
      id: 8,
      name: 'ch8a',
      x: 147,
      y: 495,
      imageUrl: '../../assets/finish.png',
      chapter: chapters[13],
    },
    {
      id: 9,
      name: 'finish',
      x: 147,
      y: 585,
      imageUrl: '../../assets/finish.png',
      chapter: chapters[14],
    },
  ];

  route2: IWaypoint[] = [
    {
      id: 0,
      name: 'start',
      x: 244,
      y: 25,
      imageUrl: '../../assets/start.jpg',
      chapter: chapters[0],
    },
    {
      id: 1,
      name: 'ch1',
      x: 244,
      y: 119,
      imageUrl: '../../assets/ch1.jpg',
      chapter: chapters[1],
    },
    {
      id: 2,
      name: 'ch2',
      x: 244,
      y: 210,
      imageUrl: '../../assets/ch4b.jpg',
      chapter: chapters[2],
    },
    {
      id: 3,
      name: 'ch3',
      x: 150,
      y: 210,
      imageUrl: '../../assets/ch3.jpg',
      chapter: chapters[3],
    },
    {
      id: 4,
      name: 'ch4b',
      x: 143,
      y: 301,
      imageUrl: '../../assets/ch4a.jpg',
      chapter: chapters[9],
    },
    {
      id: 5,
      name: 'ch5b',
      x: 243,
      y: 301,
      imageUrl: '../../assets/ch6b.jpg',
      chapter: chapters[10],
    },
    {
      id: 6,
      name: 'ch6b',
      x: 243,
      y: 395,
      imageUrl: '../../assets/ch7.png',
      chapter: chapters[11],
    },
    {
      id: 7,
      name: 'ch7b',
      x: 243,
      y: 490,
      imageUrl: '../../assets/ch8.png',
      chapter: chapters[12],
    },
    {
      id: 8,
      name: 'ch8b',
      x: 243,
      y: 585,
      imageUrl: '../../assets/finish.png',
      chapter: chapters[13],
    },
    {
      id: 9,
      name: 'finish',
      x: 147,
      y: 585,
      imageUrl: '../../assets/finish.png',
      chapter: chapters[14],
    },
  ];

  route = this.route2;

  currentWaypoint: IWaypoint = this.route[0];

  moveAvatar() {
    let nextWaypoint = this.route[this.currentWaypoint.id + 1];

    if (nextWaypoint == undefined) return;

    let x = nextWaypoint.x - this.currentWaypoint.x;
    let y = nextWaypoint.y - this.currentWaypoint.y;

    this.position.y += x;
    this.position.x += y;

    this.imageUrl = this.currentWaypoint.imageUrl;
    this.storyText = this.currentWaypoint.chapter;
    this.showStory = true;

    console.log(this.currentWaypoint);

    this.currentWaypoint = nextWaypoint;
  }

  closeStory(): void {
    console.log('story');
    this.showStory = false;
  }
}
