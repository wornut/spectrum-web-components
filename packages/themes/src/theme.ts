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

import coreStyles from './theme.css';
import lightStyles from './theme-light.css';
import sizeStyles from './scale-medium.css';

declare global {
    interface Window {
        ShadyCSS: {
            nativeShadow: boolean;
            prepareTemplate(
                template: HTMLTemplateElement,
                elementName: string,
                typeExtension?: string
            ): void;
            styleElement(host: HTMLElement): void;
            ScopingShim: {
                prepareAdoptedCssText(
                    cssTextArray: string[],
                    elementName: string
                ): void;
            };
        };
    }
    interface CSSStyleSheet {
        replaceSync(css: string): void;
    }
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}

enum Color {
    light = 'light',
    lightest = 'lightest',
    dark = 'dark',
    darkest = 'darkest',
}

enum Size {
    medium = 'medium',
    large = 'large',
}

const hasConstructableStyleSheets = false; //ShadowRoot.prototype.hasOwnProperty('adoptedStyleSheets');
const hasNativeShadowDom = false; // window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow;

abstract class ThemeStyles {
    protected themeElement: Theme;

    constructor(themeElement: Theme) {
        this.themeElement = themeElement;
    }

    public abstract updateStyleSheets(): void;
}

// Most efficient implementation using constructable style sheets
class ThemeStylesConstructable extends ThemeStyles {
    private commonStyles: CSSStyleSheet;
    private colorStyles: CSSStyleSheet;
    private sizeStyles: CSSStyleSheet;

    constructor(themeElement: Theme) {
        super(themeElement);

        this.commonStyles = new CSSStyleSheet() as CSSStyleSheet;
        this.colorStyles = new CSSStyleSheet() as CSSStyleSheet;
        this.sizeStyles = new CSSStyleSheet() as CSSStyleSheet;

        this.commonStyles.replaceSync(coreStyles.cssText);
        this.colorStyles.replaceSync(lightStyles.cssText);
        this.sizeStyles.replaceSync(sizeStyles.cssText);
    }

    public updateStyleSheets(): void {
        if (
            this.commonStyles &&
            this.colorStyles &&
            this.sizeStyles &&
            this.themeElement.shadowRoot
        ) {
            this.themeElement.shadowRoot.adoptedStyleSheets = [
                this.commonStyles,
                this.colorStyles,
                this.sizeStyles,
            ];
        }
    }
}

// Fall back to style nodes when there is a native shadow DOM implementation
class ThemeStylesNativeShadow extends ThemeStyles {
    private commonStyles: HTMLStyleElement;
    private colorStyles: HTMLStyleElement;
    private sizeStyles: HTMLStyleElement;

    constructor(themeElement: Theme) {
        super(themeElement);

        this.commonStyles = document.createElement('style');
        this.colorStyles = document.createElement('style');
        this.sizeStyles = document.createElement('style');

        this.commonStyles.innerHTML = coreStyles.cssText;

        themeElement.appendChild(this.commonStyles);
        themeElement.appendChild(this.colorStyles);
        themeElement.appendChild(this.sizeStyles);
    }

    public updateStyleSheets(): void {
        this.colorStyles.innerHTML = lightStyles.cssText;
        this.sizeStyles.innerHTML = sizeStyles.cssText;
    }
}

// For legacy browsers, using ShadyCSS shim
class ThemeStylesShady extends ThemeStyles {
    private template: HTMLTemplateElement;
    private commonStyles: HTMLStyleElement;
    private colorStyles: HTMLStyleElement;
    private sizeStyles: HTMLStyleElement;

    constructor(themeElement: Theme) {
        super(themeElement);

        this.template = document.createElement('template');
        this.commonStyles = document.createElement('style');
        this.colorStyles = document.createElement('style');
        this.sizeStyles = document.createElement('style');

        this.template.appendChild(this.commonStyles);
        this.template.appendChild(this.colorStyles);
        this.template.appendChild(this.sizeStyles);

        this.commonStyles.innerHTML = coreStyles.cssText;

        this.colorStyles.innerHTML = lightStyles.cssText;
        this.sizeStyles.innerHTML = sizeStyles.cssText;

        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
            [coreStyles.cssText, lightStyles.cssText, sizeStyles.cssText],
            this.themeElement.localName
        );
        window.ShadyCSS.prepareTemplate(
            this.template,
            this.themeElement.localName
        );
    }

    public updateStyleSheets(): void {
        window.ShadyCSS.styleElement(this.themeElement);
    }
}

export class Theme extends HTMLElement {
    private styles: ThemeStyles;

    static get observedAttributes(): string[] {
        return ['color', 'size'];
    }

    get color(): Color {
        return (this.getAttribute('color') as Color) || 'light';
    }

    set color(newValue: Color) {
        this.setAttribute('color', newValue);
    }

    get size(): Size {
        return (this.getAttribute('size') as Size) || 'medium';
    }

    set size(newValue: Size) {
        this.setAttribute('size', newValue);
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(document.createElement('slot'));
        }

        if (hasConstructableStyleSheets) {
            this.styles = new ThemeStylesConstructable(this);
        } else if (hasNativeShadowDom) {
            this.styles = new ThemeStylesNativeShadow(this);
        } else {
            this.styles = new ThemeStylesShady(this);
        }
    }

    attributeChangedCallback(): void {
        this.styles.updateStyleSheets();
    }
}
