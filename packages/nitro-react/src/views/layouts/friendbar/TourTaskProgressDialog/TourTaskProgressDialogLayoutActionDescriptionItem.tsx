import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `action_description` of TourTaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TourTaskProgressDialogLayoutActionDescriptionItemProps {
    captionActionDescription?: string;
    layout?: BoxLayout;
}

export const TourTaskProgressDialogLayoutActionDescriptionItem = ({ captionActionDescription, layout }: TourTaskProgressDialogLayoutActionDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionActionDescription ?? t('talent.track.progress.tour.info.body')}
            textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
            name="action_description"
            verticalAlign="top"
            layout={{ width: 210, height: 30, flexShrink: 0, minHeight: 30, ...layout }}
        />
    );
};
