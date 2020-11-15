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

import '../sp-color-slider.js';
import { ColorSlider } from '..';

describe('ColorSlider', () => {
    it('loads default color-slider accessibly', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages [focused]', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        el.focusElement.dispatchEvent(new FocusEvent('focus'));
        await elementUpdated(el);

        expect(el.focused);

        el.focusElement.dispatchEvent(new FocusEvent('blur'));
        await elementUpdated(el);

        expect(!el.focused);
    });
    it('accepts "Arrow*" keypresses', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(4);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider dir="rtl"></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(shiftEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(40);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(shiftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts pointer events', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px;"
                ></sp-color-slider>
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

        expect(el.value).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(47.91666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(53.125);
    });
    it('accepts pointer events while [vertical]', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    vertical
                    style="--spectrum-colorslider-vertical-default-length: 192px; --spectrum-colorslider-vertical-width: 24px;"
                ></sp-color-slider>
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

        expect(el.value).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 15,
                clientY: 100,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(47.91666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 15,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 15,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(53.125);
    });
    it('accepts pointer events in dir="rtl"', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    dir="rtl"
                    style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px;"
                ></sp-color-slider>
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

        expect(el.value).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: clientWidth - 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(56.25);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(61.45833333333333);
    });
});
