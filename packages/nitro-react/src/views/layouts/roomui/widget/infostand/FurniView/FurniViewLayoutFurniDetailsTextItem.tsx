import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `furni_details_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutFurniDetailsTextItemProps {
    captionFurniDetailsText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutFurniDetailsTextItem = ({ captionFurniDetailsText, layout }: FurniViewLayoutFurniDetailsTextItemProps) => {
    return (
        <Region
            name="furni_details_text"
            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniDetailsText ?? 'Furni details'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};
