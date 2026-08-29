import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { PackagecardNewLayoutElementList, PackagecardNewLayoutElementListProps } from './PackagecardNewLayoutElementList';

/** Generated from `959_packagecard_new_xml` (layout "packagecard_new", 334x355) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewLayoutProps {
    elementList?: PackagecardNewLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardNewLayout = ({ elementList, layout, onClose }: PackagecardNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 334, height: 355, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, width: 326, top: 0, bottom: 43, minWidth: 326, maxWidth: 380, maxHeight: 345 }}>
                    <PackagecardNewLayoutElementList {...elementList} />
                </Region>
            </Region>
        </Frame>
    );
};
