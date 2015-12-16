import {Component}    from 'angular2/core';
import {JobService}   from './job.service';
import {JobComponent} from './job.component';

@Component({
    selector: 'scheduler',
    directives: [JobComponent],
    template: `
      <div class="list-wrap">
        <ul>
          <li *ngFor="#job of jobs">
            <job [model]="job"
              (save)="onJobSave($event)"
              (delete)="onJobRemove($event)"></job>
          </li>
        </ul>
        <button *ngIf="!adding" (click)="onAddJobClick()">Add Job</button>
        <div *ngIf="adding">
          <job [model]="newJob" [isNew]="true"
              (save)="onJobAdd($event)"
              (cancelEdit)="onJobAddCancel($event)"></job>
        </div>
      </div>
    `
})

export class AppComponent {
  private jobs:any = [];
  private adding:boolean = false;
  private newJob:any = null;

  constructor(private jobService: JobService) {
    this.jobs = jobService.getJobs();
  }

  onAddJobClick() {
    this.adding = true;
    this.newJob = this.jobService.newJob();
  }

  onJobAdd(job) {
    this.adding = false;
    this.onJobSave(job);
  }

  onJobSave(job) {
    this.jobService.upsertJob(job);
  }

  onJobAddCancel() {
    this.adding = false;
  }

  onJobRemove(job) {
    this.jobService.deleteJob(job);
  }

}
