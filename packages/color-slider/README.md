## Description

An `<sp-color-slider>` lets users visually change an individual channel of a color. The background of the `<sp-color-slider>` is a visual representation of the range of values a user can select from. This can represent color properties such as hues, color channel values (such as RGB or CMYK levels), or opacity.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-slider)

```
yarn add @spectrum-web-components/color-slider
```

Import the side effectful registration of `<sp-color-slider>` via:

```
import '@spectrum-web-components/color-slider/sp-color-slider.js';
```

When looking to leverage the `ColorSlider` base class as a type and/or for extension purposes, do so via:

```
import { ColorSlider } from '@spectrum-web-components/color-slider';
```

## Default

```html
<sp-color-slider></sp-color-slider>
```

### Vertical

```html
<sp-color-slider vertical></sp-color-slider>
```

### Disabled

```html
<sp-color-slider disabled></sp-color-slider>
```
