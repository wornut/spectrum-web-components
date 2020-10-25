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
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/color-handle/sp-color-handle.js';
import styles from './color-slider.css.js';

/**
 * @element sp-color-slider
 */
export class ColorSlider extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: String })
    public color = 'rgb(255, 0, 0)';

    protected render(): TemplateResult {
        return html`
            <div class="checkerboard" role="presentation">
                <div
                    class="gradient"
                    role="presentation"
                    style="background: linear-gradient(to ${this.vertical
                        ? 'bottom'
                        : 'right'}, var(--sp-color-slider-gradient));"
                >
                    <slot name="gradient"></slot>
                </div>
            </div>

            <sp-color-handle
                class="handle"
                color=${this.color}
                ?disabled=${this.disabled}
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                min="0"
                max="100"
                step="1"
                aria-label="color"
            />
        `;
    }
}
