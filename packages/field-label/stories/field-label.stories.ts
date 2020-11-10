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
import '@spectrum-web-components/textfield/sp-textfield.js';

import '../sp-field-label.js';

export default {
    title: 'Field Label',
    component: 'sp-field-label',
};

export const standard = (): TemplateResult => {
    return html`
        <sp-field-label for="lifestory-1">Life Story</sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory-1" />
        </sp-textfield>
        <sp-field-label for="lifestory-2" disabled>
            Life Story
            <sp-textfield placeholder="Enter your life story" disabled>
                <input id="lifestory-2" />
            </sp-textfield>
        </sp-field-label>
    `;
};

export const left = (): TemplateResult => {
    return html`
        <sp-field-label for="lifestory" left style="width: 72px;">
            Life Story
        </sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory" />
        </sp-textfield>
    `;
};

export const right = (): TemplateResult => {
    return html`
        <sp-field-label for="lifestory" right style="width: 72px;">
            Life Story
        </sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory" />
        </sp-textfield>
    `;
};

export const required = (): TemplateResult => {
    return html`
        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory-1" />
        </sp-textfield>
        <sp-field-label for="lifestory-2">Life Story (Required)</sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory-2" />
        </sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-3" left style="width: 72px;" required>
            Life Story
        </sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory-3" />
        </sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-4" right style="width: 72px;" required>
            Life Story
        </sp-field-label>
        <sp-textfield placeholder="Enter your life story">
            <input id="lifestory-4" />
        </sp-textfield>
        <sp-field-label for="lifestory-5" required disabled>
            Life Story
        </sp-field-label>
        <sp-textfield placeholder="Enter your life story" disabled>
            <input id="lifestory-5" />
        </sp-textfield>
    `;
};
