import { TextStyleOptions } from "pixi.js";

import { getRenderMode } from "#base/theme-core";

import { BoxLayout } from "./Box";
import { boxLayoutToStyle } from "./dom/boxStyle";
import { getDomTextStyle } from "./dom/textStyleDom";
import { getPixiTextStyle, TextStyleKey } from "./utils/textStyles";

export type TextConfig = {
    text: string;
    textStyle?: TextStyleKey;
    textOptions?: TextStyleOptions;
    layout?: BoxLayout;
}

const TextPixi = ({ text, textStyle, textOptions, ...props }: TextConfig) => {
    const style = getPixiTextStyle(textStyle ?? "text-style-regular", textOptions);

    return <pixiText
        text={text}
        style={style}
        {...props} />;
}

/** `textOptions` is Pixi's own `TextStyleOptions` - only the handful of fields views actually
 *  pass (`fill`, `fontSize`, and the word-wrap trio) are translated; anything else Pixi-specific
 *  in there has no DOM equivalent and is left unused. */
const TextDom = ({ text, textStyle, textOptions, layout }: TextConfig) => {
    const fill = typeof textOptions?.fill === 'string' ? textOptions.fill : undefined;
    const fontSize = typeof textOptions?.fontSize === 'number' ? textOptions.fontSize : undefined;

    const style = {
        ...boxLayoutToStyle(layout),
        ...getDomTextStyle(textStyle ?? 'text-style-regular', { fill, fontSize }),
        display: 'inline-block',
    };

    if (textOptions?.wordWrap) {
        style.whiteSpace = 'normal';
        style.overflowWrap = textOptions.breakWords ? 'anywhere' : 'break-word';

        if (typeof textOptions.wordWrapWidth === 'number') style.width = textOptions.wordWrapWidth;
    }

    return <span style={style}>{text}</span>;
};

export const Text = (props: TextConfig) => getRenderMode() === 'dom' ? <TextDom {...props} /> : <TextPixi {...props} />;
