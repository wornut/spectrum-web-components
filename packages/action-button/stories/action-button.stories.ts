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
import { spreadProps } from '@open-wc/lit-helpers';
import '@spectrum-web-components/action-group';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

import '../src';
import '../sp-action-button.js';

interface Properties {
    active?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    holdAffordance?: boolean;
    icon?: TemplateResult;
    label?: string;
}

function renderButton(args: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!args.quiet}"
            ?emphasized="${!!args.emphasized}"
            ?disabled=${!!args.disabled}
            ?selected=${!!args.selected}
            ?toggles=${!!args.toggles}
            size=${args.size || 'm'}
        >
            Action
        </sp-action-button>
    `;
}

function renderButtonsSelected(args: Properties): TemplateResult {
    const disabled = Object.assign({}, args, { disabled: true });
    const selected = Object.assign({}, args, { selected: true });
    return html`
        <sp-action-group>
            ${renderButton(args)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </sp-action-group>
    `;
}

function renderHoldAffordanceButton(args: Properties): TemplateResult {
    return html`
        <sp-action-group>
            <sp-action-button
                ?quiet="${!!args.quiet}"
                ?emphasized="${!!args.emphasized}"
                ?disabled=${!!args.disabled}
                ?selected=${!!args.selected}
                ?toggles=${!!args.toggles}
                ?hold-affordance=${!!args.holdAffordance}
                size=${args.size || 'm'}
                label="Edit"
            >
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button
                quiet
                ?emphasized="${!!args.emphasized}"
                ?disabled=${!!args.disabled}
                ?selected=${!!args.selected}
                ?toggles=${!!args.toggles}
                ?hold-affordance=${!!args.holdAffordance}
                size=${args.size || 'm'}
                label="Settings"
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
            </sp-action-button>
            <sp-action-button
                selected
                ?quiet="${!!args.quiet}"
                ?emphasized="${!!args.emphasized}"
                ?disabled=${!!args.disabled}
                ?toggles=${!!args.toggles}
                ?hold-affordance=${!!args.holdAffordance}
                size=${args.size || 'm'}
                label="More"
            >
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-group>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'Action Button',
    argTypes: {
        emphasized: {
            name: 'emphasized',
            type: { name: 'boolean', required: false },
            description: "Set the second button's state to emphasized.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        disabled: {
            name: 'disabled',
            type: { name: 'boolean', required: false },
            description:
                'Disable this control. It will not receive focus or events.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        selected: {
            name: 'selected',
            type: { name: 'boolean', required: false },
            description: "Set the first button's state to selected.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        toggles: {
            name: 'toggles',
            type: { name: 'boolean', required: false },
            description: 'Allows multiple buttons to be selected at once.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

export const emphasized = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
emphasized.args = {
    emphasized: true,
};

export const emphasizedAndQuiet = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
emphasizedAndQuiet.args = {
    emphasized: true,
    quiet: true,
};

export const quiet = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
quiet.args = {
    quiet: true,
};

export const toggles = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
toggles.args = {
    quiet: true,
    toggles: true,
};

export const wIconButton = (args: Properties): TemplateResult => {
    return html`
        <sp-action-button ...=${spreadProps(args)}>
            <sp-icon-edit slot="icon"></sp-icon-edit>
            This is an action button
        </sp-action-button>
    `;
};

wIconButton.story = {
    name: 'Button with Icon',
};

export const iconOnlyButton = (args: Properties): TemplateResult => {
    return html`
        <sp-action-button label="Edit" ...=${spreadProps(args)}>
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
    `;
};

export const iconSizeOverridden = (): TemplateResult => {
    return html`
        <sp-action-button label="Edit" size="xl">
            <sp-icon-edit slot="icon" size="s"></sp-icon-edit>
        </sp-action-button>
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};
export const holdAffordance = (args: Properties): TemplateResult =>
    renderHoldAffordanceButton(args);
holdAffordance.args = {
    holdAffordance: true,
};
