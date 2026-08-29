import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { DailytasksUnclaimedLayoutSpacingItem } from './DailytasksUnclaimedLayoutSpacingItem';
import { DailytasksUnclaimedLayoutTasksListItem } from './DailytasksUnclaimedLayoutTasksListItem';

/** Generated from `121_dailytasks_unclaimed_xml` (layout "dailytasks_unclaimed", 452x426) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailytasksUnclaimedLayoutProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const DailytasksUnclaimedLayout = ({ itemsMainCont, layout, onClose }: DailytasksUnclaimedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="dailytasks_frame"
            name="dailytasks_frame"
            caption={t('dailytasks.unclaimed')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 452, height: 426, minWidth: 452, maxWidth: 452, minHeight: 426, ...layout }}
        >
            <Region
                name="main_cont"
                layout={{ position: 'absolute', left: 0, top: 0, minWidth: 452, maxWidth: 452, flexDirection: 'column', gap: 4 }}
            >
                {itemsMainCont ?? (
                    <>
                        <DailytasksUnclaimedLayoutSpacingItem />
                        <DailytasksUnclaimedLayoutTasksListItem />
                    </>
                )}
            </Region>
        </Frame>
    );
};
