import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `name_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutNameTextItem = ({ captionNameText, layout }: FurniViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
            />
        </Region>
    );
};
