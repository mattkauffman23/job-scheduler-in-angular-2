import {Component}    from 'angular2/core';
import {JobService}   from './job.service';
import {JobComponent} from './job.component';
import {Job}          from './job';

@Component({
    selector: 'scheduler',
    directives: [JobComponent],
    template: `
      <div class="col-md-8 col-md-offset-2">
        <ul *ngIf="jobs.length" class="list-group">
          <li *ngFor="#job of jobs"
              class="list-group-item ">
            <job [model]="job"
              (save)="onJobSave($event)"
              (delete)="onJobRemove($event)"></job>
          </li>
        </ul>
        <button *ngIf="!adding" (click)="onAddJobClick()"
            class="btn btn-primary btn-lg btn-block">Add Job</button>
        <div *ngIf="adding" class="list-group">
          <job [model]="newJob"
              [isNew]="true"
              (save)="onJobAdd($event)"
              (cancelEdit)="onJobAddCancel($event)"
              class="list-group-item"></job>
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
