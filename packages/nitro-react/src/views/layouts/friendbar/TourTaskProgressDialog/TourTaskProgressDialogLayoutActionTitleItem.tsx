import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `action_title` of TourTaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TourTaskProgressDialogLayoutActionTitleItemProps {
    captionActionTitle?: string;
    layout?: BoxLayout;
}

export const TourTaskProgressDialogLayoutActionTitleItem = ({ captionActionTitle, layout }: TourTaskProgressDialogLayoutActionTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="action_title"
            layout={{ width: 210, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionTitle ?? t('talent.track.progress.tour.info.caption')}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
            />
        </Region>
    );
};
