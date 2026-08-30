import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `furni_details_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutFurniDetailsTextItemProps {
    captionFurniDetailsText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutFurniDetailsTextItem = ({ captionFurniDetailsText, layout }: FurniViewLayoutFurniDetailsTextItemProps) => {
    return (
        <ThemeText
            text={captionFurniDetailsText ?? 'Furni details'}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            name="furni_details_text"
            verticalAlign="top"
            layout={{ width: 170, height: 13, flexShrink: 0, ...layout }}
        />
    );
};
