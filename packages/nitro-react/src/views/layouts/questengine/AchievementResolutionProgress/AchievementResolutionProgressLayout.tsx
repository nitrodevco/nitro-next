import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { AchievementResolutionProgressLayoutElementList, AchievementResolutionProgressLayoutElementListProps } from './AchievementResolutionProgressLayoutElementList';

/** Generated from `104_AchievementResolutionProgress_xml` (layout "AchievementResolutionProgress", 419x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementResolutionProgressLayoutProps {
    elementList?: AchievementResolutionProgressLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AchievementResolutionProgressLayout = ({ elementList, layout, onClose }: AchievementResolutionProgressLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('resolution.progress.title')}
            onClose={onClose}
            layout={{ width: 419, height: 273, minWidth: 340, minHeight: 273, maxHeight: 525, ...layout }}
        >
            <AchievementResolutionProgressLayoutElementList {...elementList} />
        </Frame>
    );
};
