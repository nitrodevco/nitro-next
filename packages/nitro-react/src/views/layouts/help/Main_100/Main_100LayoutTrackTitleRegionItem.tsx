import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `track_title_region` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackTitleRegionItemProps {
    captionTrackTitleTxt?: string;
    layout?: BoxLayout;
    onTrackTitleRegion?: () => void;
}

export const Main_100LayoutTrackTitleRegionItem = ({ captionTrackTitleTxt, layout, onTrackTitleRegion }: Main_100LayoutTrackTitleRegionItemProps) => {
    return (
        <Region
            name="track_title_region"
            layout={{ width: 160, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onTrackTitleRegion}
            cursor="pointer"
        >
            <ThemeText
                text={captionTrackTitleTxt ?? 'New player track'}
                textOptions={{ wordWrap: true }}
            />
        </Region>
    );
};
