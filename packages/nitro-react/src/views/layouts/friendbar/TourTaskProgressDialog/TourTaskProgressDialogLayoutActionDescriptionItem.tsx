import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `action_description` of TourTaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TourTaskProgressDialogLayoutActionDescriptionItemProps {
    captionActionDescription?: string;
    layout?: BoxLayout;
}

export const TourTaskProgressDialogLayoutActionDescriptionItem = ({ captionActionDescription, layout }: TourTaskProgressDialogLayoutActionDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="action_description"
            layout={{ width: 210, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionDescription ?? t('talent.track.progress.tour.info.body')}
                textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
            />
        </Region>
    );
};
