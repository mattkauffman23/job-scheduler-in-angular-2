import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {JobService}   from './job.service';

bootstrap(AppComponent, [JobService]);
