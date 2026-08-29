import { BoxLayout, Region } from '#base/theme';

import { NewFeatureNotificationCountdownLayoutMainRegion, NewFeatureNotificationCountdownLayoutMainRegionProps } from './NewFeatureNotificationCountdownLayoutMainRegion';

/** Generated from `2970_new_feature_notification_countdown_xml` (layout "new_feature_notification_countdown", 192x76) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationCountdownLayoutProps {
    layout?: BoxLayout;
    mainRegion?: NewFeatureNotificationCountdownLayoutMainRegionProps;
}

export const NewFeatureNotificationCountdownLayout = ({ layout, mainRegion }: NewFeatureNotificationCountdownLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 76, ...layout }}>
            <NewFeatureNotificationCountdownLayoutMainRegion {...mainRegion} />
        </Region>
    );
};
