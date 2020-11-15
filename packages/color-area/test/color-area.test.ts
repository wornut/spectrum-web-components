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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';
import {
    shiftEvent,
    arrowUpEvent,
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpKeyupEvent,
    arrowDownKeyupEvent,
    arrowLeftKeyupEvent,
    arrowRightKeyupEvent,
    shiftKeyupEvent,
} from '../../../test/testing-helpers.js';

import '../sp-color-area.js';
import { ColorArea } from '..';

describe('ColorArea', () => {
    it('loads default color-area accessibly', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts "color" values as hsl', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsl(100, 50%, 100%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(100);
        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);
    });
    it('accepts "color" values as hsls', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 100%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(100);
        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);
    });
    it('rejects "color" values that are not hsl', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="rgb(0,255,0)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(0);
        expect(el.y).to.equal(0);
    });
    it('accepts "Arrow*" keypresses', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 100%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(100);
        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(98);

        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);
        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(52);
        expect(el.y).to.equal(98);

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(52);
        expect(el.y).to.equal(100);

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    color="hsla(100, 50%, 100%)"
                    dir="rtl"
                ></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(100);
        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(98);

        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);
        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(48);
        expect(el.y).to.equal(98);

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(48);
        expect(el.y).to.equal(100);

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 100%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(100);
        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);

        el.dispatchEvent(shiftEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(80);

        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);
        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(70);
        expect(el.y).to.equal(80);

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(70);
        expect(el.y).to.equal(100);

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(shiftKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(50);
        expect(el.y).to.equal(100);
    });
    it('accepts pointer events', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    style="--spectrum-colorarea-default-width: 192px; --spectrum-colorarea-default-height: 192px;"
                ></sp-color-area>
            `
        );

        await elementUpdated(el);

        const { handle } = (el as unknown) as { handle: HTMLElement };

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(0);
        expect(el.y).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 100,
                clientY: 100,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(47.91666666666667);
        expect(el.y).to.equal(47.91666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(53.125);
        expect(el.y).to.equal(53.125);
    });
    it('accepts pointer events in dir=rtl', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    dir="rtl"
                    style="--spectrum-colorarea-default-width: 192px; --spectrum-colorarea-default-height: 192px;"
                ></sp-color-area>
            `
        );
        document.documentElement.dir = 'rtl';
        await elementUpdated(el);

        const { handle } = (el as unknown) as { handle: HTMLElement };
        const clientWidth = document.body.offsetWidth;

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(0);
        expect(el.y).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: clientWidth - 100,
                clientY: 100,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(56.25);
        expect(el.y).to.equal(47.91666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(61.45833333333333);
        expect(el.y).to.equal(53.125);
    });
});
