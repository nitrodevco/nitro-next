import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `user_activity_points` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserActivityPointsItemProps {
    captionUserActivityPoints?: string;
    layout?: BoxLayout;
    visibleUserActivityPoints?: boolean;
}

export const NewExtendedProfileLayoutUserActivityPointsItem = ({ captionUserActivityPoints, layout, visibleUserActivityPoints }: NewExtendedProfileLayoutUserActivityPointsItemProps) => {
    const t = useTranslation();

    return (
        (visibleUserActivityPoints ?? false) && (
            <Region
                name="user_activity_points"
                layout={{ width: 161, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            >
                {captionUserActivityPoints ?? t('extendedprofile.activitypoints')}
            </Region>
        )
    );
};
