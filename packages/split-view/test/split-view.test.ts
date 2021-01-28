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

import '../sp-split-view.js';
import { SplitView } from '..';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    homeEvent,
    pageDownEvent,
    pageUpEvent,
    shiftTabEvent,
} from '../../../test/testing-helpers.js';

describe('SplitView', () => {
    it('loads default (horizontal) split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view style="height: 200px" primary-default="100">
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
        expect(el.primaryDefault).to.equal(100);

        const gripper = el.shadowRoot
            ? (el.shadowRoot.querySelector('#gripper') as HTMLDivElement)
            : (el as SplitView);
        expect(gripper).not.to.be.accessible();
    });

    it('loads horizontal [resizable] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
        expect(el.primaryDefault).to.be.equal(304);

        const gripper = el.shadowRoot
            ? (el.shadowRoot.querySelector('#gripper') as HTMLDivElement)
            : (el as SplitView);
        expect(gripper).to.be.accessible();
    });

    it('loads horizontal [resizable] [collapsible] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
    });

    it('loads [vertical] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view vertical primary-default="100">
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
    });

    it('loads [vertical] [resizable] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
    });

    it('loads [vertical] [resizable] [collapsible] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el).to.be.accessible();
    });

    it('set all panel values', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 500px; width: 200px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;
        expect(el.collapsible).to.be.true;
        expect(el.vertical).to.be.true;
        expect(el.primaryDefault).to.equal(304);
        expect(el.primaryMin).to.equal(50);
        expect(el.primaryMax).to.equal(Infinity);
        expect(el.secondaryMin).to.equal(50);
        expect(el.secondaryMax).to.equal(Infinity);
        expect(el.dividerPosition).to.equal(el.primaryDefault);
        const size = el.offsetHeight;
        expect(el.minPos).to.equal(
            Math.max(el.primaryMin, size - el.secondaryMax)
        );
        expect(el.maxPos).to.equal(
            Math.min(el.primaryMax, size - el.secondaryMin)
        );
    });

    it('changes cursor when pointer moves [horizontal] splitview', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 200px; width: 400px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.primaryMin).to.equal(50);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;
        expect(el.style.cursor).to.equal('');

        // Pointer move over splitter
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.dividerPosition,
            })
        );
        await elementUpdated(el);
        expect(el.style.cursor).to.equal('ew-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.dividerPosition - 20,
            })
        );
        await elementUpdated(el);
        expect(el.style.cursor).to.equal('default');
    });

    it('changes cursor when pointer moves [vertical] splitview', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 400px; width: 200px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.primaryMin).to.equal(50);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;
        expect(el.style.cursor).to.equal('');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: el.dividerPosition,
            })
        );
        await elementUpdated(el);
        expect(el.style.cursor).to.equal('ns-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: el.dividerPosition - 20,
            })
        );
        await elementUpdated(el);
        expect(el.style.cursor).to.equal('default');
    });

    it('resizes when pointer moves and dragging is enabled', async () => {
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;

        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.true;

        pos -= 10;
        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        expect(el.dragging).to.be.true;
        expect(Math.round(el.dividerPosition)).to.equal(
            pos - el.getBoundingClientRect().left
        );

        const cursor = el.style.cursor;
        // don't change cursor when dragging
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos - 10,
            })
        );
        await elementUpdated(el);
        expect(el.style.cursor).to.equal(cursor);

        // don't collapse to start
        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(el.primaryMin);

        // don't collapse to end
        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().left + splitTotalWidth,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(splitTotalWidth - el.secondaryMin);

        // don't change anything when triggering mouseevent with right button click
        el.dispatchEvent(new MouseEvent('pointerdown', { button: 2 }));
        await elementUpdated(el);
        expect(el.style.cursor).to.equal(cursor);

        window.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
    });

    it('resizes and collapses to start pos when pointer moves in horizontal splitview', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 200px; width: 400px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.true;

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().left + 10,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(el.primaryMin);

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        window.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.isCollapsedStart).to.be.true;
        expect(el.style.cursor).to.equal('e-resize');
    });

    it('resizes and collapses to end pos when pointer moves in horizontal splitview', async () => {
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.primaryMin).to.equal(50);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;

        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.true;

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().left + splitTotalWidth - 10,
            })
        );
        await elementUpdated(el);
        expect(el.dragging).to.be.true;
        expect(el.dividerPosition).to.equal(splitTotalWidth - el.secondaryMin);

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().left + splitTotalWidth + 10,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(
            splitTotalWidth - el.getSplitterSize()
        );

        window.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.isCollapsedEnd).to.be.true;
        expect(el.style.cursor).to.equal('w-resize');

        el.dispatchEvent(new PointerEvent('pointerout'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.style.cursor).to.equal('default');
    });

    it('resizes and collapses to start pos when pointer moves in [vertical] splitview', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 400px; width: 200px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: pos,
            })
        );
        await elementUpdated(el);
        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.true;

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: el.getBoundingClientRect().top + 10,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(el.primaryMin);

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: 0,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        window.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.isCollapsedStart).to.be.true;
        expect(el.style.cursor).to.equal('s-resize');
    });

    it('resizes and collapses to end pos when pointer moves in [vertical] splitview', async () => {
        const splitTotalHeight = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style=${`height: ${splitTotalHeight}px; width: 200px;`}
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.primaryMin).to.equal(50);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;

        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: pos,
            })
        );
        await elementUpdated(el);
        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.true;

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: el.getBoundingClientRect().top + splitTotalHeight - 10,
            })
        );
        await elementUpdated(el);
        expect(el.dragging).to.be.true;
        expect(el.dividerPosition).to.equal(splitTotalHeight - el.secondaryMin);

        window.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: el.getBoundingClientRect().top + splitTotalHeight + 10,
            })
        );
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(
            splitTotalHeight - el.getSplitterSize()
        );

        window.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.isCollapsedEnd).to.be.true;
        expect(el.style.cursor).to.equal('n-resize');

        el.dispatchEvent(new PointerEvent('pointerout'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.style.cursor).to.equal('default');
    });

    it('handles focus and keyboard inputs and resizes accordingly for horizontal splitviews', async () => {
        const splitTotalWidth = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;

        let pos = el.dividerPosition;
        const splitter = el.shadowRoot
            ? (el.shadowRoot.querySelector('#splitter') as HTMLDivElement)
            : (el as SplitView);
        splitter.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        //Send keyboard events to resize
        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos - 10);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos + 10);

        splitter.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(pageUpEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos + 50);

        splitter.dispatchEvent(pageDownEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(
            splitTotalWidth - el.getSplitterSize()
        );

        splitter.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        splitter.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);
        const outsideFocused = document.activeElement as HTMLElement;
        expect(typeof outsideFocused).not.to.equal(splitter);
    });

    it('handles keyboard inputs and resizes accordingly for [vertical] splitviews', async () => {
        const splitTotalHeight = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style=${`width: 200px; height: ${splitTotalHeight}px;`}
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;

        let pos = el.dividerPosition;
        const splitter = el.shadowRoot
            ? (el.shadowRoot.querySelector('#splitter') as HTMLDivElement)
            : (el as SplitView);
        splitter.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        //Send keyboard events to resize
        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos - 10);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos - 10);

        splitter.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(pageUpEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos - 50);

        splitter.dispatchEvent(pageDownEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(
            splitTotalHeight - el.getSplitterSize()
        );

        splitter.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(0);

        splitter.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);
        const outsideFocused = document.activeElement as HTMLElement;
        expect(typeof outsideFocused).not.to.equal(splitter);
    });

    it('does not resize when primary-size is set', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    primary-size="150"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                    style="height: 200px; width: 400px;"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.true;
        let pos = el.dividerPosition;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);

        el.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        expect(el.dragging).to.be.false;
    });

    it('does not resize when not resizable', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    primary-min="50"
                    primary-max="Infinity"
                    secondary-min="50"
                    secondary-max="Infinity"
                >
                    <div slot="primary">First panel</div>
                    <div slot="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.dragging).to.be.false;
        expect(el.resizable).to.be.false;

        let pos = el.dividerPosition;
        const splitter = el.shadowRoot
            ? (el.shadowRoot.querySelector('#splitter') as HTMLDivElement)
            : (el as SplitView);
        splitter.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        //Send keyboard events to resize
        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.dividerPosition).to.equal(pos);
    });
});
