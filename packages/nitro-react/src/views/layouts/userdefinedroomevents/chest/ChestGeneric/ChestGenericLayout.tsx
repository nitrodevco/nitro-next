import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { ChestGenericLayoutMainList, ChestGenericLayoutMainListProps } from './ChestGenericLayoutMainList';

/** Generated from `1142_chest_generic_xml` (layout "chest_generic", 460x463) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestGenericLayoutProps {
    layout?: BoxLayout;
    mainList?: ChestGenericLayoutMainListProps;
    onClose?: () => void;
}

export const ChestGenericLayout = ({ layout, mainList, onClose }: ChestGenericLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.furni_chest')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 460, height: 463, ...layout }}
        >
            <ChestGenericLayoutMainList {...mainList} />
        </Frame>
    );
};
