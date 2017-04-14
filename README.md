# ng2 switch

[![Angular](https://img.shields.io/badge/Angular--brightgreen.svg)](https://angular.io/)
[![npm](https://img.shields.io/npm/v/ng2-switch.svg)](https://www.npmjs.com/package/ng2-switch)
[![npm-downloades](https://img.shields.io/npm/dm/ng2-switch.svg)](https://www.npmjs.com/package/ng2-switch)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/ibufu/ng2-switch/blob/master/LICENSE)

A switch component for Angular 2.

![Alt text](demo/demo.png)
## Installation
```shell
$ npm install --save ng2-switch
```
## Usage
```js
import { NgSwitchModule } from 'ng2-switch';
@NgModule({
    imports: [NgSwitchModule]
})
```
```html
<ng-switch [(ngModel)]="value"></ng-switch>
```
## props
|     name    | description |     type    |   default   |
|-------------|-------------|-------------|-------------|
| disabled    | determine whether the Switch is disabled | Boolean     | false             |
| ngModel | two way bind | Boolean     | -             |

### license
MIT
