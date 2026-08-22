import { TextStyleOptions } from "pixi.js";

import { BoxLayout } from "./Box";
import { getPixiTextStyle, TextStyleKey } from "./utils/textStyles";

export type TextConfig = {
    text: string;
    textStyle?: TextStyleKey;
    textOptions?: TextStyleOptions;
    layout?: BoxLayout;
}

export const Text = ({ text, textStyle, textOptions, ...props }: TextConfig) => {
    const style = getPixiTextStyle(textStyle ?? "text-style-regular", textOptions);

    return <pixiText
        text={text}
        style={style}
        {...props} />;
}