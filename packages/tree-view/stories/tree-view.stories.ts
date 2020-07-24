/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html } from '@open-wc/demoing-storybook';
import { TemplateResult } from 'lit-html';

import '../sp-tree-view.js';
import '../sp-tree-view-item.js';

export default {
    component: 'sp-tree-view',
    title: 'Tree View',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-tree-view>
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item open>
                Design Files
                <sp-tree-view slot="children">
                    <sp-tree-view-item>Layer 1</sp-tree-view-item>
                    <sp-tree-view-item>Layer 3</sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
            <sp-tree-view-item>Layer 4</sp-tree-view-item>
            <sp-tree-view-item open>
                Group 2
                <sp-tree-view slot="children">
                    <sp-tree-view-item open>
                        Group 3
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>
                                Group 4
                                <sp-tree-view slot="children">
                                    <sp-tree-view-item>
                                        Layer 6
                                        <sp-tree-view slot="children">
                                            <sp-tree-view-item>
                                                Group 5
                                                <sp-tree-view
                                                    slot="children"
                                                ></sp-tree-view>
                                            </sp-tree-view-item>
                                        </sp-tree-view>
                                    </sp-tree-view-item>
                                </sp-tree-view>
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    `;
};
