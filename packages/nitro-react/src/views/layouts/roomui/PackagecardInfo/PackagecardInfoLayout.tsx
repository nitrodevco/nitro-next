import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { PackagecardInfoLayoutElementList, PackagecardInfoLayoutElementListProps } from './PackagecardInfoLayoutElementList';

/** Generated from `941_packagecard_info_xml` (layout "packagecard_new", 342x298) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardInfoLayoutProps {
    elementList?: PackagecardInfoLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardInfoLayout = ({ elementList, layout, onClose }: PackagecardInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 298, minWidth: 275, minHeight: 150, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: -2, width: 336, top: 0, height: 246, minWidth: 330, maxWidth: 380, justifyContent: 'center' }}>
                <PackagecardInfoLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};
