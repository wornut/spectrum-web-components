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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/color-slider/sp-color-slider.js';
import { ColorSlider } from '@spectrum-web-components/color-slider/src/ColorSlider';
import '../sp-color-area.js';
import { ColorArea } from '../src/ColorArea.js';

export default {
    title: 'Color',
    component: 'sp-color-area',
};

export const area = (): TemplateResult => {
    return html`
        <sp-color-area></sp-color-area>
    `;
};

export const joint = (): TemplateResult => {
    return html`
        <div>
            <sp-color-area></sp-color-area>
            <sp-color-slider
                style="--sp-color-slider-gradient: rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%;"
                @input=${(
                    event: Event & {
                        target: ColorSlider & {
                            value: number;
                            previousElementSibling: ColorArea;
                        };
                    }
                ): void => {
                    const { value, previousElementSibling } = event.target;
                    previousElementSibling.hue = (value / 100) * 360;
                }}
            ></sp-color-slider>
        </div>
    `;
};

export const areaDisabled = (): TemplateResult => {
    return html`
        <sp-color-area disabled></sp-color-area>
    `;
};

export const areaSize = (): TemplateResult => {
    return html`
        <sp-color-area style="width: 72px; height: 72px"></sp-color-area>
    `;
};

export const areaCanvas = (): TemplateResult => {
    requestAnimationFrame(() => {
        const canvas = document.querySelector(
            'canvas[slot="gradient"]'
        ) as HTMLCanvasElement;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.rect(0, 0, canvas.width, canvas.height);

            const gradB = context.createLinearGradient(0, 0, 0, canvas.height);
            gradB.addColorStop(0, 'white');
            gradB.addColorStop(1, 'black');
            const gradC = context.createLinearGradient(0, 0, canvas.width, 0);
            gradC.addColorStop(0, 'hsla(0,100%,50%,0)');
            gradC.addColorStop(1, 'hsla(0,100%,50%,1)');

            context.fillStyle = gradB;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = gradC;
            context.globalCompositeOperation = 'multiply';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = 'source-over';
        }
    });
    return html`
        <sp-color-area>
            <canvas slot="gradient"></canvas>
        </sp-color-area>
    `;
};
