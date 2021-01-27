## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/split-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/split-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/split-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/split-view)

```
yarn add @spectrum-web-components/split-view
```

Import the side effectful registration of `<sp-split-view>` via:

```
import '@spectrum-web-components/split-view/sp-split-view.js';
```

When looking to leverage the `SplitView` base class as a type and/or for extension purposes, do so via:

```
import { SplitView } from '@spectrum-web-components/split-view';
```

### Variants

#### Horizontal

```html
<sp-split-view>
    <div slot="primary">Left panel</div>
    <div slot="secondary">Right panel</div>
</sp-split-view>
```

#### Horizontal Resizable

```html
<sp-split-view
    resizable
    primary-min="50"
    primary-max="Infinity"
    secondary-min="50"
    secondary-max="Infinity"
>
    <div slot="primary">
        <h1>Left panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div slot="secondary">
        <h2>Right panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

#### Horizontal Resizable & Collapsible

```html
<sp-split-view
    resizable
    collapsible
    primary-min="50"
    primary-max="Infinity"
    secondary-min="50"
    secondary-max="Infinity"
    style="height: 200px"
>
    <div slot="primary">
        <h1>Left panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div slot="secondary">
        <h2>Right panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

#### Vertical

```html
<sp-split-view vertical>
    <div slot="primary">Top panel</div>
    <div slot="secondary">Bottom panel</div>
</sp-split-view>
```

#### Vertical Resizable

```html
<sp-split-view
    vertical
    resizable
    primary-min="50"
    primary-max="Infinity"
    secondary-min="50"
    secondary-max="Infinity"
>
    <div slot="primary">
        <h1>Top panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div slot="secondary">
        <h2>Bottom panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

#### Vertical Resizable & Collapsible

```html
<sp-split-view
    vertical
    resizable
    collapsible
    primary-min="50"
    primary-max="Infinity"
    secondary-min="50"
    secondary-max="Infinity"
    style="width: 200px"
>
    <div slot="primary">
        <h1>Top panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div slot="secondary">
        <h2>Bottom panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```
