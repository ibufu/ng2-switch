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
    template: `
        <h3>Switch</h3>
        <ng-switch [(ngModel)]="value"></ng-switch>
        <p>value: {{value | json}}</p>
        
        <h3>Disabled switch (false):</h3>
        <ng-switch [value]="false" disabled></ng-switch>
        
        <h3>Disabled switch (true):</h3>
        <ng-switch [value]="true" disabled></ng-switch>
        
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
