import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `name_extra_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNameExtraTextItemProps {
    captionNameExtraText?: string;
    layout?: BoxLayout;
    visibleNameExtraText?: boolean;
}

export const FurniViewLayoutNameExtraTextItem = ({ captionNameExtraText, layout, visibleNameExtraText }: FurniViewLayoutNameExtraTextItemProps) => {
    return (
        (visibleNameExtraText ?? false) && (
            <Region
                name="name_extra_text"
                layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionNameExtraText ?? 'Chest name'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                />
            </Region>
        )
    );
};
