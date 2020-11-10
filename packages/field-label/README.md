## Description

An `<sp-field-label>` provides accessible labelling for form elements. Use the `for` attribute to outline the `id` of an element in the same DOM tree to which it should associate itself.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-label?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-label)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-label?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-label)

```
yarn add @spectrum-web-components/field-label
```

Import the side effectful registration of `<sp-field-label>` via:

```
import '@spectrum-web-components/field-label/sp-field-label.js';
```

When looking to leverage the `FieldLabel` base class as a type and/or for extension purposes, do so via:

```
import { FieldLabel } from '@spectrum-web-components/field-label';
```

## Example

```html
<sp-field-label for="lifestory">
    Life Story
</sp-field-label>
<sp-textfield placeholder="Enter your life story" id="lifestory">
    <input />
</sp-textfield>
<sp-field-label for="birth-place">
    Birthplace
</sp-field-label>
<sp-dropdown id="birth-place">
    <span slot="label">Choose a location:</span>
    <sp-menu>
        <sp-menu-item>San Antonio</sp-menu-item>
    </sp-menu>
</sp-dropdown>
```
