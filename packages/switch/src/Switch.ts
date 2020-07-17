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
import { useSwitch } from '@react-aria/switch';

import { CheckboxBase } from '@spectrum-web-components/checkbox';

import switchStyles from './switch.css.js';
import legacyStyles from './switch-legacy.css.js';

export class Switch extends CheckboxBase {
    public static get styles(): CSSResultArray {
        /* istanbul ignore if */
        if (window.hasOwnProperty('ShadyDOM')) {
            // Override some styles if we are using the web component polyfill
            return [switchStyles, legacyStyles];
        }
        return [switchStyles];
    }

    protected render(): TemplateResult {
        // use the state from react-stately, this manages isSelected state
        const state = useToggleState(this);
        // use the hook from react-aria, this gives us event bindings and aria
        // attributes to use in our DOM rendering
        const { inputProps } = useSwitch(this, state, this);
        // we have to hack the spread naming to be compatible with lit-html
        // can now just spread the events and aria attributes onto the input box
        return html`
            ${this.renderInput(inputProps)}
            <span id="switch"></span>
            <label id="label" for="input">
                <slot></slot>
            </label>
        `;
    }
}
