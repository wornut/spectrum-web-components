import {
    html,
    css,
    CSSResultGroup,
    TemplateResult,
} from '@spectrum-web-components/base';

export function toHtmlTemplateString(code: string): TemplateResult {
    const stringArray = [`${code}`] as any;
    stringArray.raw = [`${code}`];
    return html(stringArray as TemplateStringsArray);
}

export function toCssTemplateString(code: string): CSSResultGroup {
    const stringArray = [`${code}`] as any;
    stringArray.raw = [`${code}`];
    return css(stringArray as TemplateStringsArray);
}
