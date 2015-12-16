import {Component} from 'angular2/core';
import {Job} from './job';

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
      <button>Add Job</button>
    `
})

export class AppComponent {
  public jobs = _jobs;
}

let _jobs: Job[] = [
  { id: 1, cmd: 'foo bar baz', size: Job.Sizes.Small, frequency: Job.Frequencies.Hourly, nextDue: new Date(), lastRun: new Date()},
  { id: 2, cmd: 'baz bar foo', size: Job.Sizes.Free, frequency: Job.Frequencies.Daily, nextDue: new Date(), lastRun: new Date()}
];
