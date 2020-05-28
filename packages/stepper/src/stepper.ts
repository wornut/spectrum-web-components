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

import { Chevron75Icon } from '@spectrum-web-components/icons-ui';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { Textfield } from '@spectrum-web-components/textfield';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import styles from './stepper.css.js';

/**
 * @element sp-stepper
 */
export class Stepper extends Textfield {
    public static get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true, attribute: 'keyboard-focused' })
    public keyboardFocused = false;

    @property({ type: Number })
    public step = 1;

    private increment(): void {
        let value = parseFloat(this.value);
        value += this.step;
        this.value = `${value}`;
    }

    private decrement(): void {
        let value = parseFloat(this.value);
        value -= this.step;
        this.value = `${value}`;
    }

    protected render(): TemplateResult {
        return html`
            ${super.render()}
            <span
                class="buttons"
                @focusin=${() => (this.focused = true)}
                @focusout=${() => (this.focused = false)}
            >
                <sp-action-button
                    class="stepUp"
                    tabindex="-1"
                    ?focused=${this.focused}
                    @click=${this.increment}
                >
                    <sp-icon
                        slot="icon"
                        class="stepper-icon spectrum-UIIcon-ChevronUp75"
                    >
                        ${Chevron75Icon()}
                    </sp-icon>
                </sp-action-button>
                <sp-action-button
                    class="stepDown"
                    tabindex="-1"
                    ?focused=${this.focused}
                    @click=${this.decrement}
                >
                    <sp-icon
                        slot="icon"
                        class="stepper-icon spectrum-UIIcon-ChevronDown75"
                    >
                        ${Chevron75Icon()}
                    </sp-icon>
                </sp-action-button>
            </span>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.multiline = false;
    }
}
