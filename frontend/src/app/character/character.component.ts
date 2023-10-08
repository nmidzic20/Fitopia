// character.component.ts
import { Component } from '@angular/core';
import { DailyQuestsComponent } from '../daily-quests/daily-quests.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  // Define character properties (you can retrieve these from your app's data)
  points = 100;

  character = {
    name: 'Lily',
    level: 5,
    health: 80,
    // Add more character properties here
    progress: 100,
    points: this.points | 0
  };

  totalSteps = 10000;
}
