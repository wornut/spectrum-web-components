## Description

An `<sp-color-area>` allows users to visually select two properties of a color simultaneously. It's commonly used together with a color slider or color wheel.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-area?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-area)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-area?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-area)

```
yarn add @spectrum-web-components/color-area
```

Import the side effectful registration of `<sp-color-area>` via:

```
import '@spectrum-web-components/color-area/sp-color-area.js';
```

When looking to leverage the `ColorArea` base class as a type and/or for extension purposes, do so via:

```
import { ColorArea } from '@spectrum-web-components/color-area';
```

## Standard

```html
<sp-color-area></sp-color-area>
```

## Variants

### Disabled

An `<sp-color-area>` in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the area may become available later.

```html
<sp-color-area disabled></sp-color-area>
```

### Sized

An `<sp-color-area>`’s height and width can be customized appropriately for its context.

```html
<sp-color-area
    style="
        width: var(--spectrum-global-dimension-size-900); 
        height: var(--spectrum-global-dimension-size-900)"
></sp-color-area>
```
