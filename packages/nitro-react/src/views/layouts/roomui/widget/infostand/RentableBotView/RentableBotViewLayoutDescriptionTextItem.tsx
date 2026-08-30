import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionTextItemProps {
    captionDescriptionText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutDescriptionTextItem = ({ captionDescriptionText, layout }: RentableBotViewLayoutDescriptionTextItemProps) => {
    return (
        <ThemeText
            text={captionDescriptionText ?? ''}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            name="description_text"
            verticalAlign="top"
            layout={{ width: 170, height: 31, flexShrink: 0, ...layout }}
        />
    );
};
