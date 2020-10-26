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
    PropertyValues,
    query,
} from '@spectrum-web-components/base';

import styles from './color-area.css.js';

/**
 * @element sp-color-area
 */
export class ColorArea extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: String })
    public color = 'hsl(0, 0%, 100%)';

    @property({ type: Number })
    public x = 0;

    @property({ type: Number })
    public y = 0;

    @property({ type: Number })
    public step = 0.01;

    @query('[name="x"]')
    private inputX!: HTMLInputElement;

    @query('[name="y"]')
    private inputY!: HTMLInputElement;

    private get altered(): number {
        return this._altered;
    }

    private set altered(altered: number) {
        this._altered = altered;
        this.step = Math.max(0.01, this.altered * 10 * 0.01);
    }

    private _altered = 0;

    private altKeys = new Set();

    private activeKeys = new Set();

    private handleFocusin(): void {
        this.focused = true;
    }

    private handleFocusout(): void {
        this.focused = false;
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { key, code } = event;
        if (
            key === 'Shift' ||
            key === 'Meta' ||
            key === 'Control' ||
            key === 'Alt'
        ) {
            this.altKeys.add(key);
            this.altered = this.altKeys.size;
        }
        if (code.search('Arrow') === 0) {
            this.activeKeys.add(code);
        }
        this.handleKeypress();
    }

    private handleKeypress(): void {
        let deltaX = 0;
        let deltaY = 0;
        this.activeKeys.forEach((code) => {
            switch (code) {
                case 'ArrowUp':
                    deltaY = -this.step;
                    break;
                case 'ArrowDown':
                    deltaY = this.step;
                    break;
                case 'ArrowLeft':
                    deltaX = this.step * (this.isLTR ? -1 : 1);
                    break;
                case 'ArrowRight':
                    deltaX = this.step * (this.isLTR ? 1 : -1);
                    break;
                default:
                    break;
            }
        });
        if (deltaX) {
            this.inputX.focus();
        } else if (deltaY) {
            this.inputY.focus();
        }
        this.y = Math.min(1, Math.max(this.y + deltaY, 0));
        this.x = Math.min(1, Math.max(this.x + deltaX, 0));
        this.color = `hsl(0, ${this.x * 100}%, ${100 - this.y * 100}%)`;
    }

    private handleKeyup(event: KeyboardEvent): void {
        const { key, code } = event;
        if (
            key === 'Shift' ||
            key === 'Meta' ||
            key === 'Control' ||
            key === 'Alt'
        ) {
            this.altKeys.delete(key);
            this.altered = this.altKeys.size;
        }
        if (code.search('Arrow') === 0) {
            this.activeKeys.delete(code);
        }
    }

    protected render(): TemplateResult {
        return html`
            <div
                class="gradient"
                style="background: linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, white 0%, rgba(0, 0, 0, 0) 100%), rgb(255, 0, 0);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                class="handle"
                color=${this.color}
                ?disabled=${this.disabled}
                style="top: ${this.y * 100}%; left: ${this.x * 100}%;"
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                name="x"
                aria-label="saturation and value"
                min="0"
                max="1"
                step=${this.step}
                .value=${String(this.x)}
                @keyup=${(event: KeyboardEvent) => event.preventDefault()}
            />
            <input
                type="range"
                class="slider"
                name="y"
                aria-label="saturation and value"
                min="0"
                max="1"
                step=${this.step}
                .value=${String(this.x)}
                @keyup=${(event: KeyboardEvent) => event.preventDefault()}
            />
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keyup', this.handleKeyup);
        this.addEventListener('keydown', this.handleKeydown);
    }
}
