import {Job, Sizes, Frequencies} from './job';

declare var _;

export class JobService {

  private jobs: Job[];

  constructor() {
    this.jobs = [];
  }

  getJobs() {
    return this.jobs;
  }

  newJob() {
    return new Job(this.nextId(), 'rake do_something', 'free', 'hourly',
        new Date(), new Date());
  }

  deleteJob(job: Job) {
    const index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  }

  upsertJob(job: Job) {
    const match = this.jobs.find(item => item.id === job.id));
    if (match) {
      this.jobs.splice(this.jobs.indexOf(match), 1, job);
    } else {
      this.jobs.push(job);
    }
  }

  private nextId() {
    return this.jobs.length ? _.max(this.jobs, 'id').id + 1 : 0;
  }

}
