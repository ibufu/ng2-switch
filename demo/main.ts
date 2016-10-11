import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { NgSwitchModule } from '../src/ng2-switch';

@Component({
    selector: '#app',
    template: `<ng-switch [(ngModel)]="value"></ng-switch>
    <p>value: {{value | json}}</p>
    <p>disabled:<p>
    <ng-switch disabled></ng-switch>
    `,
})
class App {
    value = false;
}

@NgModule({
    imports: [BrowserModule, FormsModule, NgSwitchModule],
    declarations: [App],
    bootstrap: [App],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
