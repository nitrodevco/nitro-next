import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `track_desc_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackDescTxtItemProps {
    captionTrackDescTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackDescTxtItem = ({ captionTrackDescTxt, layout }: Main_100LayoutTrackDescTxtItemProps) => {
    return (
        <ThemeText
            text={captionTrackDescTxt ?? 'Kickstart your Habbo journey!'}
            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
            name="track_desc_txt"
            verticalAlign="top"
            layout={{ width: 160, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
