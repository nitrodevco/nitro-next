import { BoxLayout, Region } from '#base/theme';

import { DiscountValueItemLayoutDiscountValueContainer, DiscountValueItemLayoutDiscountValueContainerProps } from './DiscountValueItemLayoutDiscountValueContainer';

/** Generated from `1552_discountValueItem_xml` (layout "discountValueItem", 180x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscountValueItemLayoutProps {
    discountValueContainer?: DiscountValueItemLayoutDiscountValueContainerProps;
    layout?: BoxLayout;
}

export const DiscountValueItemLayout = ({ discountValueContainer, layout }: DiscountValueItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 37, ...layout }}>
            <DiscountValueItemLayoutDiscountValueContainer {...discountValueContainer} />
        </Region>
    );
};
