import {Component} from 'angular2/core';

enum Size { Free, Small, Medium, Big, Giant };
enum Frequency { Daily, Hourly, TenMinutes };

interface Job {
  id: number;
  cmd: string;
  size: Size;
  frequency: Frequency;
  nextDue: Date;
  lastRun: Date;
}

@Component({
    selector: 'scheduler',
    template: `
      <ul>
        <li *ngFor="#job of jobs">
          <div> >> {{ job.cmd }}</div>
          <div>{{ job.size }}</div>
          Edit...
        </li>
      </ul>
    `
})

export class AppComponent {
  public jobs = _jobs;
}

let _jobs: Job[] = [
  { id: 1, cmd: 'foo bar baz', size: Size.Small, frequency: Frequency.Hourly, nextDue: new Date(), lastRun: new Date()},
  { id: 2, cmd: 'baz bar foo', size: Size.Free, frequency: Frequency.Daily, nextDue: new Date(), lastRun: new Date()},
];
