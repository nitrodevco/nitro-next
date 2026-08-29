import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `track_desc_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackDescTxtItemProps {
    captionTrackDescTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackDescTxtItem = ({ captionTrackDescTxt, layout }: Main_100LayoutTrackDescTxtItemProps) => {
    return (
        <Region
            name="track_desc_txt"
            layout={{ width: 160, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTrackDescTxt ?? 'Kickstart your Habbo journey!'}
                textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
            />
        </Region>
    );
};
