import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `habbicon_popup_description` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupDescriptionItemProps {
    captionHabbiconPopupDescription?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupDescriptionItem = ({ captionHabbiconPopupDescription, layout }: HabbiconHubLayoutHabbiconPopupDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habbicon_popup_description"
            layout={{ width: 156, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHabbiconPopupDescription ?? t('habbicon.popup.desc.not_owned')}
                textOptions={{ wordWrap: true, wordWrapWidth: 156 }}
            />
        </Region>
    );
};
