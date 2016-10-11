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

function booleanFieldValueFactory() {
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
        <input
            class="ng2-switch"
            type="checkbox"
            [disabled]="disabled"
            [(ngModel)]="value"
        />
    `,
    styles: [`
        .ng2-switch {
            position: relative;
            width: 52px;
            height: 32px;
            border: 1px solid #dfdfdf;
            outline: 0;
            border-radius: 16px;
            box-sizing: border-box;
            background: #dfdfdf;
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        .ng2-switch:focus {
            outline: none;
        }
        .ng2-switch:after, .switch:before {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            height: 30px;
            border-radius: 15px;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s,-webkit-transform .3s;
        }
        .ng2-switch:before {
            width: 50px;
            background-color: #fdfdfd;
        }
        .ng2-switch:after {
            width: 30px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,.4);
        }
        .ng2-switch:checked {
            border-color: #04be02;
            background-color: #04be02;
        }
        .ng2-switch:checked:before {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        .ng2-switch:checked:after {
            -webkit-transform: translateX(20px);
            transform: translateX(20px);
        }
        .ng2-switch:disabled {
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
