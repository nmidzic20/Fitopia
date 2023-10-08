import { Component, Input } from '@angular/core';
import { IWaypoint } from '../shared/models/IWaypoint';
import { titles, texts } from '../shared/models/IChapter';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Input() position = { x: 0, y: 0 };
  showStory = false;
  storyTitle: string | null = titles[0];
  storyText: string | null = texts[0];
  imageUrl = '../../assets/start.png';
  showDailyQuests: boolean = false;
  steps: number | undefined;
  stepsArray: number[] | undefined;

  constructor(private userService: UsersService) {
    this.getSteps();
    this.checkSteps();
  }

  async getSteps() {
    this.stepsArray = await this.userService.getFitnessData();
  }

  checkSteps() {
    console.log(this.steps);
  }

  resizeMap() {}

  route1: IWaypoint[] = [
    {
      id: 0,
      name: 'start',
      x: 244,
      y: 25,
      imageUrl: '../../assets/start.png',
      chapter: texts[0],
      title: titles[0],
    },
    {
      id: 1,
      name: 'ch1',
      x: 244,
      y: 114,
      imageUrl: '../../assets/ch1.jpg',
      chapter: texts[1],
      title: titles[1],
    },
    {
      id: 2,
      name: 'ch2',
      x: 244,
      y: 202,
      imageUrl: '../../assets/ch2.jpg',
      chapter: texts[2],
      title: titles[2],
    },
    {
      id: 3,
      name: 'ch3',
      x: 150,
      y: 202,
      imageUrl: '../../assets/ch3.jpg',
      chapter: texts[3],
      title: titles[3],
    },
    {
      id: 4,
      name: 'ch4a',
      x: 50,
      y: 202,
      imageUrl: '../../assets/ch4a.jpg',
      chapter: texts[4],
      title: titles[4],
    },
    {
      id: 5,
      name: 'ch5a',
      x: 50,
      y: 285,
      imageUrl: '../../assets/ch5a.jpg',
      chapter: texts[5],
      title: titles[5],
    },
    {
      id: 6,
      name: 'ch6a',
      x: 50,
      y: 380,
      imageUrl: '../../assets/ch7.png',
      chapter: texts[6],
      title: titles[6],
    },
    {
      id: 7,
      name: 'ch7a',
      x: 50,
      y: 463,
      imageUrl: '../../assets/ch8.png',
      chapter: texts[7],
      title: titles[7],
    },
    {
      id: 8,
      name: 'ch8a',
      x: 147,
      y: 463,
      imageUrl: '../../assets/finish.png',
      chapter: texts[13],
      title: titles[13],
    },
    {
      id: 9,
      name: 'finish',
      x: 147,
      y: 557,
      imageUrl: '../../assets/finish.png',
      chapter: texts[14],
      title: titles[14],
    },
  ];

  route2: IWaypoint[] = [
    {
      id: 0,
      name: 'start',
      x: 244,
      y: 25,
      imageUrl: '../../assets/start.png',
      chapter: texts[0],
      title: titles[0],
    },
    {
      id: 1,
      name: 'ch1',
      x: 244,
      y: 114,
      imageUrl: '../../assets/ch1.jpg',
      chapter: texts[1],
      title: titles[1],
    },
    {
      id: 2,
      name: 'ch2',
      x: 244,
      y: 202,
      imageUrl: '../../assets/ch4b.jpg',
      chapter: texts[2],
      title: titles[2],
    },
    {
      id: 3,
      name: 'ch3',
      x: 150,
      y: 202,
      imageUrl: '../../assets/ch3.jpg',
      chapter: texts[3],
      title: titles[3],
    },
    {
      id: 4,
      name: 'ch4b',
      x: 143,
      y: 285,
      imageUrl: '../../assets/ch4a.jpg',
      chapter: texts[9],
      title: titles[9],
    },
    {
      id: 5,
      name: 'ch5b',
      x: 243,
      y: 285,
      imageUrl: '../../assets/ch6b.jpg',
      chapter: texts[10],
      title: titles[10],
    },
    {
      id: 6,
      name: 'ch6b',
      x: 243,
      y: 375,
      imageUrl: '../../assets/ch7.png',
      chapter: texts[11],
      title: titles[11],
    },
    {
      id: 7,
      name: 'ch7b',
      x: 243,
      y: 463,
      imageUrl: '../../assets/ch8.png',
      chapter: texts[12],
      title: titles[12],
    },
    {
      id: 8,
      name: 'ch8b',
      x: 243,
      y: 557,
      imageUrl: '../../assets/finish.png',
      chapter: texts[13],
      title: titles[13],
    },
    {
      id: 9,
      name: 'finish',
      x: 147,
      y: 557,
      imageUrl: '../../assets/finish.png',
      chapter: texts[14],
      title: titles[14],
    },
  ];

  route = this.route2;

  currentWaypoint: IWaypoint = this.route[0];

  maxWaypoint: IWaypoint = this.route[0];

  moveAvatar() {
    let nextWaypoint = this.route[this.currentWaypoint.id + 1];

    if (nextWaypoint == undefined) return;

    let x = nextWaypoint.x - this.currentWaypoint.x;
    let y = nextWaypoint.y - this.currentWaypoint.y;

    this.position.y += x;
    this.position.x += y;

    this.imageUrl = this.currentWaypoint.imageUrl;
    this.storyText = this.currentWaypoint.chapter;
    this.storyTitle = this.currentWaypoint.title;
    this.showStory = true;

    console.log(this.currentWaypoint);

    this.maxWaypoint = this.currentWaypoint;
    this.currentWaypoint = nextWaypoint;
    console.log('max way' + this.maxWaypoint);

    if (this.stepsArray != undefined)
      this.steps = this.stepsArray[this.currentWaypoint.id];
  }

  closeStory(): void {
    console.log('story');
    this.showStory = false;
  }

  setDailyQuests(param: boolean): void {
    this.showDailyQuests = false;
  }

  nextSlide(x: number): void {
    let nextWaypoint = this.route[this.maxWaypoint.id + x];

    if (
      nextWaypoint == undefined ||
      nextWaypoint.id >= this.currentWaypoint.id
    ) {
      console.log('return');
      return;
    }

    this.maxWaypoint = nextWaypoint;

    this.imageUrl = this.maxWaypoint.imageUrl;
    this.storyText = this.maxWaypoint.chapter;
    this.storyTitle = this.maxWaypoint.title;
    this.showStory = true;
  }
}
