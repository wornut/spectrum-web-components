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
    css,
    query,
    PropertyValues,
} from '@spectrum-web-components/base';

import styles from './split-view.css.js';

const COLLAPSE_THREASHOLD = 50;

const ORIENTATIONS = {
    horizontal: 'width',
    vertical: 'height',
};

const CURSORS = {
    horizontal: {
        default: 'ew-resize',
        min: 'e-resize',
        max: 'w-resize',
    },
    vertical: {
        default: 'ns-resize',
        min: 's-resize',
        max: 'n-resize',
    },
};

const SPLITTERSIZE = 2;

/**
 * @element sp-split-view
 */
export class SplitView extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [
            styles,
            css`
                .pane {
                    overflow: hidden;
                }
                .secondaryPane {
                    flex: 1;
                }
                #splitter {
                    height: 'initial'; /* TBD: 100% is not working for horizontal splitview??? */
                }
            `,
        ];
    }

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: Boolean, reflect: true })
    public resizable = false;

    @property({ type: Boolean, reflect: true })
    public collapsible = false;

    /** The minimum size of the primary pane */
    @property({ type: Number, attribute: 'primary-min' })
    public primaryMin = 304;

    /** The maximum size of the primary pane */
    @property({ type: Number, attribute: 'primary-max' })
    public primaryMax = Infinity;

    /** The size of the primary pane */
    @property({ type: Number, attribute: 'primary-size' })
    public primarySize = this.primaryMin;

    /** The default size of the primary pane */
    @property({ type: Number, attribute: 'primary-default' })
    public primaryDefault = 304;

    /** The minimum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-min' })
    public secondaryMin = 304;

    /** The maximum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-max' })
    public secondaryMax = Infinity;

    /** The maximum size of all panes together */
    @property({ type: Number, attribute: 'total-max' })
    public totalMax?: number;

    @property({ type: Number, attribute: false })
    public dividerPosition =
        this.primarySize === undefined ? this.primaryDefault : this.primarySize;

    @property({ type: Number, attribute: false })
    public minPos = 0;

    @property({ type: Number, attribute: false })
    public maxPos = Infinity;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-start' })
    public isCollapsedStart = this.dividerPosition === 0;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-end' })
    public isCollapsedEnd = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @query('#gripper')
    private gripper!: HTMLDivElement;

    private supportsPointerEvent = 'setPointerCapture' in this;
    private currentMouseEvent?: MouseEvent;
    private offset = 0;
    private size = 0;
    // private lastPosition = 0;

    protected render(): TemplateResult {
        const dimension = this.vertical
            ? ORIENTATIONS.vertical
            : ORIENTATIONS.horizontal;

        return html`
            <div
                class="pane"
                style=${`${dimension}: ${this.dividerPosition}px`}
            >
                <slot name="primary"></slot>
            </div>
            <div id="splitter" role="separator">
                ${this.resizable
                    ? html`
                          <div
                              id="gripper"
                              @pointermove=${this.onPointerMove}
                              @pointerdown=${this.onPointerDown}
                              @pointerup=${this.onPointerUp}
                              @pointercancel=${this.onPointerCancel}
                              @pointerenter=${this.onPointerEnter}
                              @onpointerout=${this.onPointerOut}
                              @onMouseDown=${this.onMouseDown}
                              role="presentation"
                          ></div>
                      `
                    : html``}
            </div>
            <div class="pane secondaryPane">
                <slot name="secondary"></slot>
            </div>
        `;
    }

    private onPointerDown(event: PointerEvent): void {
        if (this.disabled) {
            return;
        }
        // this.focus();
        this.dragging = true;
        this.offset = this.getOffset();
        this.gripper.setPointerCapture(event.pointerId);
    }

    private onMouseDown(event: MouseEvent): void {
        if (this.supportsPointerEvent) {
            return;
        }
        if (this.disabled) {
            return;
        }
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        // this.focus();
        this.dragging = true;
        this.currentMouseEvent = event;
        this._trackMouseEvent();
    }

    private _trackMouseEvent(): void {
        if (!this.currentMouseEvent || !this.dragging) {
            return;
        }
        const pos = this.getPosition(this.currentMouseEvent) - this.offset;
        this.processPosition(pos);
        requestAnimationFrame(() => this._trackMouseEvent());
    }

    private onPointerUp(): void {
        this.dragging = false;
    }

    private onMouseUp = (event: MouseEvent): void => {
        this.currentMouseEvent = event;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        requestAnimationFrame(() => {
            this.dragging = false;
        });
    };

    private onPointerMove(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        event.preventDefault();
        const pos = this.getPosition(event) - this.offset;
        this.processPosition(pos);
    }

    private onMouseMove = (event: MouseEvent): void => {
        this.currentMouseEvent = event;
    };

    private onPointerCancel(): void {
        this.dragging = false;
    }

    private onPointerEnter(): void {
        this.updateCursor(true);
    }

    private onPointerOut(): void {
        this.updateCursor();
    }

    private processPosition(pos: number): void {
        if (this.collapsible && pos < this.minPos - COLLAPSE_THREASHOLD) {
            pos = 0;
        }
        if (
            this.collapsible &&
            this.totalMax &&
            pos > this.maxPos + COLLAPSE_THREASHOLD
        ) {
            pos = this.totalMax - SPLITTERSIZE;
        }
        this.updatePosition(pos);
        this.updateCursor();
    }

    getOffset(): number {
        const rect = this.getBoundingClientRect();
        return this.vertical ? rect.top : rect.left;
    }

    getPosition(event: PointerEvent | MouseEvent): number {
        return this.vertical ? event.clientY : event.clientX;
    }

    protected resize(): void {
        this.size = this.vertical ? this.offsetHeight : this.offsetWidth;
        this.minPos = Math.max(this.primaryMin, this.size - this.secondaryMax);
        this.maxPos = Math.min(this.primaryMax, this.size - this.secondaryMin);
        this.updatePosition(this.dividerPosition);
    }

    updatePosition(x: number): void {
        // this.lastPosition = this.dividerPosition;
        let pos = Math.max(this.minPos, Math.min(this.maxPos, x));
        if (this.collapsible && x === 0) {
            pos = 0;
        }
        if (
            this.collapsible &&
            this.totalMax &&
            x > this.maxPos &&
            x === this.totalMax - SPLITTERSIZE
        ) {
            pos = this.totalMax - SPLITTERSIZE;
        }
        if (pos !== this.dividerPosition) {
            this.dividerPosition = pos;
        }
        this.isCollapsedStart = this.dividerPosition === 0;
        this.isCollapsedEnd = (this.totalMax &&
            this.dividerPosition >= this.totalMax - SPLITTERSIZE) as boolean;
    }

    private updateCursor(override = false): void {
        if (this.dragging || override) {
            const cursors = this.vertical
                ? CURSORS.vertical
                : CURSORS.horizontal;
            let cursor = cursors.default;
            if (this.dividerPosition <= this.minPos) {
                cursor = cursors.min;
            } else if (this.dividerPosition >= this.maxPos) {
                cursor = cursors.max;
            }
            if (this.gripper) {
                this.gripper.style.cursor = cursor;
            }
        } else if (!this.dragging) {
            if (this.gripper) {
                this.gripper.style.cursor = 'default';
            }
        }
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        if (this.totalMax) {
            if (this.vertical) {
                this.style.height = `${this.totalMax}px`;
            } else {
                this.style.width = `${this.totalMax}px`;
            }
        }
        this.resize();
    }
}
