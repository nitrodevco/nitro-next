import { BoxLayout, Region } from '#base/theme';

import { HabboOrderinfoGiftCheckedLayoutGiftInfoContainer, HabboOrderinfoGiftCheckedLayoutGiftInfoContainerProps } from './HabboOrderinfoGiftCheckedLayoutGiftInfoContainer';

/** Generated from `1716_habbo_orderinfo_gift_checked_xml` (layout "habbo_orderinfo_dialog", 282x127) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoGiftCheckedLayoutProps {
    giftInfoContainer?: HabboOrderinfoGiftCheckedLayoutGiftInfoContainerProps;
    layout?: BoxLayout;
}

export const HabboOrderinfoGiftCheckedLayout = ({ giftInfoContainer, layout }: HabboOrderinfoGiftCheckedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 282, height: 127, ...layout }}>
            <HabboOrderinfoGiftCheckedLayoutGiftInfoContainer {...giftInfoContainer} />
        </Region>
    );
};
