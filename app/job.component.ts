import {Component, OnInit, EventEmitter}  from 'angular2/core';
import {Job, Sizes, Frequencies} from './job';

@Component({
  selector: 'job',
  inputs: ['model', 'isNew'],
  outputs: ['save', 'delete', 'cancelEdit'],
  template: `
    <form class="job">
      <div *ngIf="!editing" class="input-group command">
        <span class="input-group-addon">$</span>
        <input type="text" [(ngModel)]="model.cmd" class="form-control" disabled/>
      </div>
      <div *ngIf="editing" class="input-group command">
        <span class="input-group-addon">$</span>
        <input type="text" [(ngModel)]="workingCopy.cmd"
            placeholder="rake do_something" class="form-control"/>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label>Dyno Size</label>
          <small *ngIf="!editing">{{ model.size }}</small>
          <select *ngIf="editing"
              [(ngModel)]="workingCopy.size">
            <option *ngFor="#opt of sizeOpts" [value]="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <label>Frequency</label>
          <small *ngIf="!editing">{{ model.frequency }}</small>
          <select *ngIf="editing"
              [(ngModel)]="workingCopy.frequency">
            <option *ngFor="#opt of frequencyOpts" [value]="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <label>Last Run</label>
          <small>{{ formatLastRun(model.lastRun) }}</small>
        </div>
        <div class="col-md-3">
          <label>Next Due</label>
          <small>{{ model.nextDue | date: 'short' }}</small>
        </div>
      </div>
      <div *ngIf="!editing" class="actions">
        <button (click)="onEditClick()" class="btn btn-default">edit</button>
        <button (click)="onDeleteClick()" class="btn btn-link">remove</button>
      </div>
      <div *ngIf="editing" class="actions">
        <button (click)="onSaveClick()" class="btn btn-primary">save</button>
        <button (click)="onCancelClick()" class="btn btn-link">cancel</button>
      </div>
    </form>
  `
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
