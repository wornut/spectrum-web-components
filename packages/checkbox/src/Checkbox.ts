/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { CSSResultArray, TemplateResult, html } from 'lit-element';

import { useToggleState } from '@react-stately/toggle';
import { useCheckbox } from '@react-aria/checkbox';

import { CheckboxBase } from './CheckboxBase.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    CheckmarkSmallIcon,
    DashSmallIcon,
} from '@spectrum-web-components/icons-ui';

import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark-small.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash-small.css.js';

export class Checkbox extends CheckboxBase {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            checkboxStyles,
            checkmarkSmallStyles,
            dashSmallStyles,
        ];
    }

    protected render(): TemplateResult {
        // use the state from react-stately, this manages isSelected state
        const state = useToggleState(this);
        // use the hook from react-aria, this gives us event bindings and aria
        // attributes to use in our DOM rendering
        const { inputProps } = useCheckbox(this, state, this);
        // we have to hack the spread naming to be compatible with lit-html
        // can now just spread the events and aria attributes onto the input box
        return html`
            <label id="root">
                ${this.renderInput(inputProps)}
                <span id="box">
                    <sp-icon id="checkmark" size="s" class="checkmark-small">
                        ${CheckmarkSmallIcon({ hidden: true })}
                    </sp-icon>
                    <sp-icon id="partialCheckmark" size="s" class="dash-small">
                        ${DashSmallIcon({ hidden: true })}
                    </sp-icon>
                </span>
                <span id="label"><slot></slot></span>
            </label>
        `;
    }
}
