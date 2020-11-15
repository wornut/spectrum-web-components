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
    streamingListener,
} from '@spectrum-web-components/base';
import { ColorHandle } from '@spectrum-web-components/color-handle';
import '@spectrum-web-components/color-handle/sp-color-handle.js';

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

    @query('.handle')
    private handle!: ColorHandle;

    @property({ type: Number })
    public hue = 0;

    @property({ type: String })
    public get color(): string {
        const lightness = (100 - this.x / 2) * (this.y / 100);
        return `hsl(${this.hue}, ${this.x}%, ${100 - this.x / 2 - lightness}%)`;
    }

    public set color(color: string) {
        const values = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/.exec(color);
        if (values === null) {
            console.warn(`Non-HSL value applied to color: ${color}`);
            return;
        }
        const oldValue = this.color;
        const [, h, s, l] = values;
        this.hue = parseFloat(h);
        this.x = parseFloat(s);
        this.y = parseFloat(l);
        this.requestUpdate('color', oldValue);
    }

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
                /* c8 ignore next 2 */
                default:
                    break;
            }
        });
        if (deltaX) {
            this.inputX.focus();
        } else if (deltaY) {
            this.inputY.focus();
        }
        const x = Math.min(1, Math.max(this.x / 100 + deltaX, 0));
        const y = Math.min(1, Math.max(this.y / 100 + deltaY, 0));
        this.x = x * 100;
        this.y = y * 100;
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

    private boundingClientRect!: DOMRect;

    private handlePointerdown(event: PointerEvent): void {
        this.boundingClientRect = this.getBoundingClientRect();
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
    }

    private handlePointermove(event: PointerEvent): void {
        const [x, y] = this.calculateHandlePosition(event);
        this.x = x * 100;
        this.y = y * 100;
        this.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private handlePointerup(event: PointerEvent): void {
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);
        this.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(event: PointerEvent): [number, number] {
        /* c8 ignore next 3 */
        if (!this.boundingClientRect) {
            return [this.x, this.y];
        }
        const rect = this.boundingClientRect;
        const minOffsetX = rect.left;
        const minOffsetY = rect.top;
        const offsetX = event.clientX;
        const offsetY = event.clientY;
        const width = rect.width;
        const height = rect.height;

        const percentX = Math.max(
            0,
            Math.min(1, (offsetX - minOffsetX) / width)
        );
        const percentY = Math.max(
            0,
            Math.min(1, (offsetY - minOffsetY) / height)
        );

        return [this.isLTR ? percentX : 1 - percentX, percentY];
    }

    private handleAreaPointerdown(event: PointerEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.handle.dispatchEvent(new PointerEvent('pointerdown', event));
        this.handlePointermove(event);
    }

    protected render(): TemplateResult {
        this.boundingClientRect = this.getBoundingClientRect();
        const { width, height } = this.boundingClientRect;
        return html`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background:
                    linear-gradient(to top, black 0%, hsla(${this
                    .hue}, 100%, 0%, 0) 100%),
                    linear-gradient(to right, white 0%, hsla(${this
                    .hue}, 100%, 0%, 0) 100%), hsl(${this.hue}, 100%, 50%);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                class="handle"
                color=${this.color}
                ?disabled=${this.disabled}
                style="transform: translate(${(this.x / 100) * width}px, ${(this
                    .y /
                    100) *
                height}px);"
                @manage=${streamingListener(
                    { type: 'pointerdown', fn: this.handlePointerdown },
                    { type: 'pointermove', fn: this.handlePointermove },
                    {
                        type: ['pointerup', 'pointercancel'],
                        fn: this.handlePointerup,
                    }
                )}
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                name="x"
                aria-label="saturation and value"
                min="0"
                max="1"
                step=${this.step}
                .value=${String(this.x / 100)}
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
                .value=${String(this.y / 100)}
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
