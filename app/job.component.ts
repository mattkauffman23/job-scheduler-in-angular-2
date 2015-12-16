import {Component, OnInit, EventEmitter}  from 'angular2/core';
import {Job, Sizes, Frequencies} from './job';

@Component({
  selector: 'job',
  inputs: ['model', 'isNew'],
  outputs: ['save', 'delete', 'cancelEdit'],
  template: `
    <form class="job">
      <div *ngIf="!editing" class="command">{{ model.cmd }}</div>
      <div *ngIf="editing" class="command">
        <input type="text" [(ngModel)]="workingCopy.cmd" />
      </div>
      <div class="row">
        <div class="col-25">
          <label>Dyno Size</label>
          <span *ngIf="!editing">{{ model.size }}</span>
          <select *ngIf="editing"
              [(ngModel)]="workingCopy.size">
            <option *ngFor="#opt of sizeOpts" [value]="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <div class="col-25">
          <label>Frequency</label>
          <span *ngIf="!editing">{{ model.frequency }}</span>
          <select *ngIf="editing"
              [(ngModel)]="workingCopy.frequency">
            <option *ngFor="#opt of frequencyOpts" [value]="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <div class="col-25">
          <label>Last Run</label>
          {{ model.lastRun }}
        </div>
        <div class="col-25">
          <label>Next Due</label>
          {{ model.nextDue }}
        </div>
      </div>
      <div *ngIf="!editing" class="actions">
        <button (click)="onEditClick()">edit</button>
        <button (click)="onDeleteClick()">remove</button>
      </div>
      <div *ngIf="editing" class="actions">
        <button (click)="onSaveClick()">save</button>
        <button (click)="onCancelClick()">cancel</button>
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

  ngOnInit() {
    if (this.isNew) {
      this.editing = true;
      this.workingCopy = this.model.clone();
    }
  }

  onEditClick() {
    this.editing = true;
    this.workingCopy = this.model.clone();
  }

  onCancelClick() {
    this.editing = false;
    this.cancelEdit.next(null);
  }

  onSaveClick() {
    this.editing = false;
    this.save.next(this.workingCopy);
  }

  onDeleteClick() {
    this.delete.next(this.model);
  }

}
