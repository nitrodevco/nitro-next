import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `description_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionTextItemProps {
    captionDescriptionText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutDescriptionTextItem = ({ captionDescriptionText, layout }: RentableBotViewLayoutDescriptionTextItemProps) => {
    return (
        <Region
            name="description_text"
            layout={{ width: 170, height: 31, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescriptionText ?? ''}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};
