import {Component} from 'angular2/core';

enum Size { Free, Small, Medium, Big, Giant };
enum Frequency { Daily, Hourly, TenMinutes };

interface Job {
  id: number;
  cmd: string;
  size: Size;
  frequency: Frequency;
  nextDue: number;
  lastRun: number;
}

@Component({
    selector: 'my-app',
    template: '<h1>my app title</h1>'
})

export class AppComponent {

}
