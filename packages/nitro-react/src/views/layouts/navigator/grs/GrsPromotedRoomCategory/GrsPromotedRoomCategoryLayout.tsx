import { BoxLayout, Region } from '#base/theme';

import { GrsPromotedRoomCategoryLayoutRow, GrsPromotedRoomCategoryLayoutRowProps } from './GrsPromotedRoomCategoryLayoutRow';

/** Generated from `3061_grs_promoted_room_category_xml` (layout "hells", 270x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsPromotedRoomCategoryLayoutProps {
    layout?: BoxLayout;
    row?: GrsPromotedRoomCategoryLayoutRowProps;
}

export const GrsPromotedRoomCategoryLayout = ({ layout, row }: GrsPromotedRoomCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 90, ...layout }}>
            <GrsPromotedRoomCategoryLayoutRow {...row} />
        </Region>
    );
};
