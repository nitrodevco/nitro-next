import { PixiReactElementProps } from "@pixi/react";
import { Text as PixiText, TextStyleOptions } from "pixi.js";

import { getPixiTextStyle, TextStyleKey } from "./utils/textStyles";

type TextProps = {
    text: string;
    textStyle?: TextStyleKey;
    textOptions?: TextStyleOptions;
} & PixiReactElementProps<typeof PixiText>;

export const Text = ({ text, textStyle, textOptions, layout, ...props }: TextProps) => {
    const style = getPixiTextStyle(textStyle ?? "text-style-regular", textOptions);

    return <pixiText
        text={text}
        style={style}
        layout={layout ?? {}}
        {...props} />;
}