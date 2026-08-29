import { BoxLayout, Region } from '#base/theme';

import { BundlesInfoItemLayoutInfoContainer, BundlesInfoItemLayoutInfoContainerProps } from './BundlesInfoItemLayoutInfoContainer';

/** Generated from `1568_bundlesInfoItem_xml` (layout "bundlesInfoItem", 182x142) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BundlesInfoItemLayoutProps {
    infoContainer?: BundlesInfoItemLayoutInfoContainerProps;
    layout?: BoxLayout;
}

export const BundlesInfoItemLayout = ({ infoContainer, layout }: BundlesInfoItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 182, height: 142, ...layout }}>
            <BundlesInfoItemLayoutInfoContainer {...infoContainer} />
        </Region>
    );
};
