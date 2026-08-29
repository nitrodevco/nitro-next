import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `0` of EffectSelectorLayout - pass real rows through its `items…` slot. */
export interface EffectSelectorLayout_0ItemProps {
    caption_0?: string;
    layout?: BoxLayout;
}

export const EffectSelectorLayout_0Item = ({ caption_0, layout }: EffectSelectorLayout_0ItemProps) => {
    return (
        <Region
            name="0"
            layout={{ width: 256, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={caption_0 ?? 'None'}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};
