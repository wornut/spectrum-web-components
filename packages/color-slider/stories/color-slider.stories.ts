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

import '../sp-color-slider.js';

export default {
    title: 'Color',
    component: 'sp-color-slider',
};

export const slider = (): TemplateResult => {
    return html`
        <sp-color-slider></sp-color-slider>
    `;
};

export const sliderAlpha = (): TemplateResult => {
    return html`
        <sp-color-slider
            style="--sp-color-slider-gradient: rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%;"
            color="rgba(0, 0, 0, 1)"
        ></sp-color-slider>
    `;
};

export const sliderDisabled = (): TemplateResult => {
    return html`
        <sp-color-slider disabled></sp-color-slider>
    `;
};

export const sliderVertical = (): TemplateResult => {
    return html`
        <sp-color-slider vertical></sp-color-slider>
    `;
};

export const sliderCanvas = (): TemplateResult => {
    requestAnimationFrame(() => {
        const canvas = document.querySelector(
            'canvas[slot="gradient"]'
        ) as HTMLCanvasElement;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.rect(0, 0, canvas.width, canvas.height);

            const gradient = context.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
            );

            gradient.addColorStop(0, '#8ED6FF');
            gradient.addColorStop(1, '#004CB3');

            context.fillStyle = gradient;
            context.fill();
        }
    });
    return html`
        <sp-color-slider color="#8ED6FF">
            <canvas slot="gradient" role="presentation"></canvas>
        </sp-color-slider>
    `;
};

export const sliderImage = (): TemplateResult => {
    return html`
        <sp-color-slider color="#ff00de">
            <img
                slot="gradient"
                role="presentation"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAeCAIAAAAkbYJ/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNBMTBENzk4QkQzMTFFQThDOTdDN0QyNDNGMUNFMzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNBMTBEN0E4QkQzMTFFQThDOTdDN0QyNDNGMUNFMzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGM0ExMEQ3NzhCRDMxMUVBOEM5N0M3RDI0M0YxQ0UzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGM0ExMEQ3ODhCRDMxMUVBOEM5N0M3RDI0M0YxQ0UzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrmQ8p4AAADbSURBVHja7JFLDsMgDAWNc/9L9h7YiQ0Gou66rGaUWHxegDDN5SPiEm/Uo+3S3LPWIzEy2uqu1Vh1dy3q5TM/ks38yprJbGdXK38GdHwVs94sAtXNas9h/LIK2zE11jlHrI5ksa9a5r+mdJ3E8i+OveISurzCvldr3V/dp91XQLTPvWYdgbFCr/tcp81BqW/bzKxLkz2epxLzPWglS7Y1ERX4axCMYEAwIBgQDAgGBAOCEQwIBgQDggHBgGBAMIIBwYBgQDAgGBAMCAYEIxgQDAgGBAOC4RduAQYALiXYw9aNKvcAAAAASUVORK5CYII="
            />
        </sp-color-slider>
    `;
};
