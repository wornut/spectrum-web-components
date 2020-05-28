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

import {
    html,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';

import {
    ChevronUpSmallIcon,
    ChevronDownSmallIcon,
} from '@spectrum-web-components/icons-ui';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/button/sp-field-button.js';
import { Textfield } from '@spectrum-web-components/textfield';
import chevronDownSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron-down-small.css.js';
import chevronUpSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron-up-small.css.js';
import styles from './stepper.css.js';

/**
 * @element sp-stepper
 */
export class Stepper extends Textfield {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            styles,
            chevronDownSmallStyles,
            chevronUpSmallStyles,
        ];
    }

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true, attribute: 'keyboard-focused' })
    public keyboardFocused = false;

    protected render(): TemplateResult {
        return html`
            ${super.render()}
            <span class="buttons">
                <sp-field-button class="stepUp" tabindex="-1">
                    <sp-icon slot="icon" class="stepper-icon chevron-up-small">
                        ${ChevronUpSmallIcon({ hidden: true })}
                    </sp-icon>
                </sp-field-button>
                <sp-field-button class="stepDown" tabindex="-1">
                    <sp-icon
                        slot="icon"
                        class="stepper-icon chevron-down-small"
                    >
                        ${ChevronDownSmallIcon({ hidden: true })}
                    </sp-icon>
                </sp-field-button>
            </span>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.multiline = false;
    }
}
