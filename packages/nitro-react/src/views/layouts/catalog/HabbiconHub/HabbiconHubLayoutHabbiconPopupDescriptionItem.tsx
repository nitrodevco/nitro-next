import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `habbicon_popup_description` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupDescriptionItemProps {
    captionHabbiconPopupDescription?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupDescriptionItem = ({ captionHabbiconPopupDescription, layout }: HabbiconHubLayoutHabbiconPopupDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHabbiconPopupDescription ?? t('habbicon.popup.desc.not_owned')}
            textOptions={{ wordWrap: true, wordWrapWidth: 156 }}
            name="habbicon_popup_description"
            verticalAlign="top"
            layout={{ width: 156, height: 20, flexShrink: 0, ...layout }}
        />
    );
};
