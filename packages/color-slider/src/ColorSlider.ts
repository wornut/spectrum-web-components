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
    query,
} from '@spectrum-web-components/base';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import styles from './color-slider.css.js';

/**
 * @element sp-color-slider
 */
export class ColorSlider extends Focusable {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: Number })
    public value = 0;

    @property({ type: String })
    public color = 'rgb(255, 0, 0)';

    @property({ type: Number })
    public step = 1;

    private get altered(): number {
        return this._altered;
    }

    private set altered(altered: number) {
        this._altered = altered;
        this.step = Math.max(1, this.altered * 10);
    }

    private _altered = 0;

    private altKeys = new Set();

    @query('input')
    public input!: HTMLInputElement;

    public get focusElement(): HTMLInputElement {
        return this.input;
    }

    private handleKeydown(event: KeyboardEvent): void {
        event.preventDefault();
        const { key } = event;
        if (
            key === 'Shift' ||
            key === 'Meta' ||
            key === 'Control' ||
            key === 'Alt'
        ) {
            this.altKeys.add(key);
            this.altered = this.altKeys.size;
        }
        let delta = 0;
        switch (key) {
            case 'ArrowUp':
                delta = this.step;
                break;
            case 'ArrowDown':
                delta = -this.step;
                break;
            case 'ArrowLeft':
                delta = this.step * (this.isLTR ? -1 : 1);
                break;
            case 'ArrowRight':
                delta = this.step * (this.isLTR ? 1 : -1);
                break;
        }
        this.value = Math.min(100, Math.max(0, this.value + delta));
    }

    private handleKeyup(event: KeyboardEvent): void {
        event.preventDefault();
        const { key } = event;
        if (
            key === 'Shift' ||
            key === 'Meta' ||
            key === 'Control' ||
            key === 'Alt'
        ) {
            this.altKeys.delete(key);
            this.altered = this.altKeys.size;
        }
    }

    private handleFocus(): void {
        this.focused = true;
    }

    private handleBlur(): void {
        this.focused = false;
    }

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
                style="left: ${this.value}%"
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                min="0"
                max="100"
                step=${this.step}
                aria-label="color"
                .value=${String(this.value)}
                @keydown=${this.handleKeydown}
                @keyup=${this.handleKeyup}
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
            />
        `;
    }
}
