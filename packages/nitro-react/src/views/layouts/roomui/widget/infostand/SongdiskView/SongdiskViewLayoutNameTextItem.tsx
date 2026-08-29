import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `name_text` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutNameTextItem = ({ captionNameText, layout }: SongdiskViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            layout={{ width: 154, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
            />
        </Region>
    );
};
