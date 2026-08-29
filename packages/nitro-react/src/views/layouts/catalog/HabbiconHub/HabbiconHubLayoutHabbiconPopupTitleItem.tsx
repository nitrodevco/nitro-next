import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `habbicon_popup_title` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupTitleItemProps {
    captionHabbiconPopupTitle?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupTitleItem = ({ captionHabbiconPopupTitle, layout }: HabbiconHubLayoutHabbiconPopupTitleItemProps) => {
    return (
        <Region
            name="habbicon_popup_title"
            layout={{ width: 164, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionHabbiconPopupTitle ?? 'Habbicon name'}
                textStyle="text-style-u-bold"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
