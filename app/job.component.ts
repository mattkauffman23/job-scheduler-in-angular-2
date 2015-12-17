import {Component, OnInit, EventEmitter}  from 'angular2/core';
import {Job, Sizes, Frequencies} from './job';

@Component({
  selector: 'job',
  inputs: ['model', 'isNew'],
  outputs: ['save', 'delete', 'cancelEdit'],
  templateUrl: 'templates/job.html'
})

export class JobComponent implements OnInit {
  private isNew:boolean;
  private model:Job;
  private workingCopy:Job;
  private save:EventEmitter<any> = new EventEmitter();
  private delete:EventEmitter<any> = new EventEmitter();
  private cancelEdit:EventEmitter<any> = new EventEmitter();
  private editing:boolean = false;
  private frequencyOpts:string[] = Frequencies;
  private sizeOpts:string[] = Sizes;

  ngOnInit():void {
    if (this.isNew) {
      this.editing = true;
      this.workingCopy = this.model.clone();
    }
  }

  onEditClick():void {
    this.editing = true;
    this.workingCopy = this.model.clone();
  }

  onCancelClick():void {
    this.editing = false;
    this.cancelEdit.next(null);
  }

  onSaveClick():void {
    this.editing = false;
    this.save.next(this.workingCopy);
  }

  onDeleteClick():void {
    this.delete.next(this.model);
  }

  // Had to move out of template becuase: https://github.com/angular/angular/issues/5169
  formatLastRun(date: Date) {
    return date.getTime() === 0 ? 'Never' : date.toString();
  }

}
