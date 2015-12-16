import {Component}    from 'angular2/core';
import {JobService}   from './job.service';
import {JobComponent} from './job.component';
import {Job}          from './job';

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
  private jobs:Job[];
  private newJob:Job;
  private adding:boolean = false;

  constructor(private jobService: JobService) {
    this.jobs = jobService.getJobs();
  }

  onAddJobClick():void {
    this.adding = true;
    this.newJob = this.jobService.newJob();
  }

  onJobAdd(job: Job):void {
    this.adding = false;
    this.onJobSave(job);
  }

  onJobSave(job: Job):void {
    this.jobService.upsertJob(job);
  }

  onJobAddCancel():void {
    this.adding = false;
  }

  onJobRemove(job: Job):void {
    this.jobService.deleteJob(job);
  }

}
