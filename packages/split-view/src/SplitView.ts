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
    PropertyValues,
    ifDefined,
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
                    height: auto; /* for horizontal splitviews without proper outter height value */
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
    public primarySize?: number;

    /** The default size of the primary pane */
    @property({ type: Number, attribute: 'primary-default' })
    public primaryDefault = 304;

    /** The minimum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-min' })
    public secondaryMin = 304;

    /** The maximum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-max' })
    public secondaryMax = Infinity;

    @property({ type: Number, attribute: false })
    public dividerPosition = this.primaryDefault;

    @property({ type: Number, attribute: false })
    public minPos = 0;

    @property({ type: Number, attribute: false })
    public maxPos = Infinity;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-start' })
    public isCollapsedStart = this.dividerPosition === 0;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-end' })
    public isCollapsedEnd = false;

    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean, reflect: true })
    public hovered = false;

    @property()
    public label?: string;

    private offset = 0;
    private size = 0;
    private isOver = false;
    private lastPosition = 0;

    public constructor() {
        super();
        this.onPointerDragged = this.onPointerDragged.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.resize = this.resize.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

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
            <div
                id="splitter"
                role="separator"
                aria-label=${ifDefined(this.label || undefined)}
                tabindex=${ifDefined(this.resizable ? '0' : undefined)}
                @keydown=${this.onKeyDown}
            >
                ${this.resizable
                    ? html`
                          <div id="gripper"></div>
                      `
                    : html``}
            </div>
            <div class="pane secondaryPane">
                <slot name="secondary"></slot>
            </div>
        `;
    }

    onPointerMove(event: PointerEvent): void {
        this.isOver = true;
        if (this.dragging) {
            return;
        }
        this.updateCursor(event);
    }

    onPointerDown(event: PointerEvent): void {
        if (event.button && event.button !== 0) {
            return;
        }
        if (this.hovered) {
            if (this.primarySize !== undefined) {
                return;
            }
            window.addEventListener(
                'pointermove',
                this.onPointerDragged,
                false
            );
            window.addEventListener('pointerup', this.onPointerUp, false);
            this.dragging = true;
            this.offset = this.getOffset();
        }
    }

    onPointerDragged(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        event.preventDefault();
        let pos = this.getPosition(event) - this.offset;
        if (this.collapsible && pos < this.minPos - COLLAPSE_THREASHOLD) {
            pos = 0;
        }
        if (this.collapsible && pos > this.maxPos + COLLAPSE_THREASHOLD) {
            pos = this.size - this.getSplitterSize();
        }
        this.updatePosition(pos);
    }

    onPointerUp(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        window.removeEventListener('pointermove', this.onPointerDragged, false);
        window.removeEventListener('pointerup', this.onPointerUp, false);
        this.dragging = false;
        this.updateCursor(event);
        if (!this.isOver) {
            this.style.cursor = 'default';
        }
    }

    onPointerOut(): void {
        this.isOver = false;
        this.hovered = false;
        if (!this.dragging) {
            this.style.cursor = 'default';
        }
    }

    private getOffset(): number {
        const rect = this.getBoundingClientRect();
        return this.vertical ? rect.top : rect.left;
    }

    private getPosition(event: PointerEvent): number {
        return this.vertical ? event.clientY : event.clientX;
    }

    private increment(event: KeyboardEvent, offset: number): void {
        event.preventDefault();
        this.updatePosition(this.dividerPosition + offset);
    }

    private decrement(event: KeyboardEvent, offset: number): void {
        event.preventDefault();
        this.updatePosition(this.dividerPosition - offset);
    }

    onKeyDown(event: KeyboardEvent): void {
        if (!this.resizable || this.primarySize !== undefined) {
            return;
        }
        switch (event.key) {
            case 'Left':
            case 'ArrowLeft':
                this.decrement(event, 10);
                break;
            case 'Up':
            case 'ArrowUp':
                if (this.vertical) {
                    this.decrement(event, 10);
                } else {
                    this.increment(event, 10);
                }
                break;
            case 'PageUp':
                if (this.vertical) {
                    this.decrement(event, 50);
                } else {
                    this.increment(event, 50);
                }
                break;
            case 'Right':
            case 'ArrowRight':
                this.increment(event, 10);
                break;
            case 'Down':
            case 'ArrowDown':
                if (this.vertical) {
                    this.increment(event, 10);
                } else {
                    this.decrement(event, 10);
                }
                break;
            case 'PageDown':
                if (this.vertical) {
                    this.increment(event, 50);
                } else {
                    this.decrement(event, 50);
                }
                break;
            case 'Home':
                event.preventDefault();
                this.updatePosition(this.collapsible ? 0 : this.minPos);
                break;
            case 'End':
                event.preventDefault();
                this.updatePosition(
                    this.collapsible
                        ? this.size - this.getSplitterSize()
                        : this.maxPos
                );
                break;
            case 'Enter':
                if (this.collapsible) {
                    event.preventDefault();
                    this.updatePosition(
                        this.dividerPosition === 0
                            ? this.lastPosition || this.minPos
                            : 0
                    );
                }
                break;
        }
    }

    protected resize(): void {
        this.size = this.vertical ? this.offsetHeight : this.offsetWidth;
        this.minPos = Math.max(this.primaryMin, this.size - this.secondaryMax);
        this.maxPos = Math.min(this.primaryMax, this.size - this.secondaryMin);
        this.updatePosition(this.dividerPosition);
    }

    updatePosition(x: number): void {
        this.lastPosition = this.dividerPosition;
        let pos = Math.max(this.minPos, Math.min(this.maxPos, x));
        if (this.collapsible && x <= 0) {
            pos = 0;
        }
        if (
            this.collapsible &&
            x > this.maxPos &&
            x >= this.size - this.getSplitterSize()
        ) {
            pos = this.size - this.getSplitterSize();
        }
        if (pos !== this.dividerPosition) {
            this.dividerPosition = pos;
        }
        this.isCollapsedStart = this.dividerPosition === 0;
        this.isCollapsedEnd =
            this.dividerPosition >= this.size - this.getSplitterSize();
    }

    updateCursor(event: PointerEvent) {
        let currentOver =
            this.dragging || this.dividerContainsPoint(this.getPosition(event));
        let wasOver = this.dragging ? false : this.hovered;

        if (!wasOver && currentOver) {
            const cursors = this.vertical
                ? CURSORS.vertical
                : CURSORS.horizontal;
            let cursor = cursors.default;
            if (this.dividerPosition <= this.minPos) {
                cursor = cursors.min;
            } else if (this.dividerPosition >= this.maxPos) {
                cursor = cursors.max;
            }
            this.hovered = this.isOver;
            this.style.cursor = cursor;
        } else if (wasOver && !currentOver) {
            this.hovered = false;
            this.style.cursor = 'default';
        }
    }

    private dividerContainsPoint(x: number) {
        x -= this.getOffset();
        let padding = 10;
        let d1 = this.dividerPosition - padding;
        let d2 = this.dividerPosition + padding;
        return x >= d1 && x <= d2;
    }

    private getSplitterSize(): number {
        const el = this.shadowRoot.querySelector('#splitter') as HTMLElement;
        return Math.round(
            parseFloat(
                window
                    .getComputedStyle(el)
                    .getPropertyValue(this.vertical ? 'height' : 'width')
            )
        );
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);

        if (this.resizable) {
            this.addEventListener('pointermove', this.onPointerMove);
            this.addEventListener('pointerdown', this.onPointerDown);
            this.addEventListener('pointerout', this.onPointerOut);
        }
        this.dividerPosition =
            this.primarySize === undefined
                ? this.primaryDefault
                : this.primarySize;
        this.resize();
    }

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.resize);
    }

    public disconnectedCallback(): void {
        window.removeEventListener('resize', this.resize);
        super.disconnectedCallback();
    }
}
