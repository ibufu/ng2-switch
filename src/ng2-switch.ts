/**
 * Created by lcx on 2016/7/11.
 */
import { Component, forwardRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule  } from '@angular/forms';


const noop = () => {};

export const SWITCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgSwitch),
    multi: true
};

export function booleanFieldValueFactory() {
    return function booleanFieldValueMetadata(target: any, key: string): void {
        const defaultValue = target[key];
        const localKey = `__md_private_symbol_${key}`;
        target[localKey] = defaultValue;

        Object.defineProperty(target, key, {
            get() { return (<any>this)[localKey]; },
            set(value: boolean) {
                (<any>this)[localKey] = value != null && `${value}` !== 'false';
            }
        });
    };
}

@Component({
    selector: 'ng-switch',
    template: `
        <label class="ng2-switch" [ngClass]="{'disabled': disabled}">
            <input class="ng2-switch-input" 
                   type="checkbox"
                   [disabled]="disabled"
                   [(ngModel)]="value" />
            <span class="ng2-switch-label"></span> 
            <span class="ng2-switch-handle"></span> 
        </label>
    `,
    styles: [`
        .ng2-switch {
            position: relative;
            display: block;
            vertical-align: top;
            width: 52px;
            height: 32px;
            background: #dfdfdf;
            border-radius: 16px;
            cursor: pointer;
        }
        .ng2-switch-input {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
        .ng2-switch-label {
            position: relative;
            display: block;
            height: inherit;
            background: #dfdfdf;
            border-radius: inherit;
        }
        
        .ng2-switch-input:checked ~ .ng2-switch-label {
            background: #04be02;
        }
        .ng2-switch-handle {
            position: absolute;
            top: 1px;
            left: 1px;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,.4);
        }
        .ng2-switch-input:checked ~ .ng2-switch-handle {
            left: 20px;
        }
         
        .ng2-switch-label, .ng2-switch-handle {
            transition: All 0.3s ease;
            -webkit-transition: All 0.3s ease;
            -moz-transition: All 0.3s ease;
            -o-transition: All 0.3s ease;
        }
        
        .ng2-switch.disabled {
            cursor: not-allowed;
        }
    `],
    providers: [SWITCH_CONTROL_VALUE_ACCESSOR],
})
export class NgSwitch implements ControlValueAccessor{
    private _value: any = '';
    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    @Input() @booleanFieldValueFactory() disabled: boolean = false;

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any) {
        this._value = value;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    _handleChange(event: Event) {
        this.value = (<HTMLInputElement>event.target).value;
        this._onTouchedCallback();
    }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgSwitch],
  exports: [NgSwitch]
})
export class NgSwitchModule {

}
