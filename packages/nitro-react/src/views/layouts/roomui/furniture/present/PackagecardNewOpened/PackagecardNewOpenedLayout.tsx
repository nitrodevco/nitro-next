import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { PackagecardNewOpenedLayoutElementList, PackagecardNewOpenedLayoutElementListProps } from './PackagecardNewOpenedLayoutElementList';

/** Generated from `835_packagecard_new_opened_xml` (layout "packagecard_new_opened", 342x360) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewOpenedLayoutProps {
    elementList?: PackagecardNewOpenedLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardNewOpenedLayout = ({ elementList, layout, onClose }: PackagecardNewOpenedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 360, ...layout }}
        >
            <Region
                backgroundColor="#e9e9e9"
                layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305 }}
            >
                <PackagecardNewOpenedLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};
