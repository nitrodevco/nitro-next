import { Border, BoxLayout, CloseButton, Region, ThemeImage } from '#base/theme';

import { RentableBotViewLayoutButtonList, RentableBotViewLayoutButtonListProps } from './RentableBotViewLayoutButtonList';
import { RentableBotViewLayoutInfostandElementList, RentableBotViewLayoutInfostandElementListProps } from './RentableBotViewLayoutInfostandElementList';

/** Generated from `1066_rentable_bot_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentableBotViewLayoutProps {
    buttonList?: RentableBotViewLayoutButtonListProps;
    infostandElementList?: RentableBotViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcHomeIcon?: string;
    tintHomeIcon?: string;
}

export const RentableBotViewLayout = ({ buttonList, infostandElementList, layout, onClose, srcHomeIcon, tintHomeIcon }: RentableBotViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        src={srcHomeIcon}
                        tint={tintHomeIcon}
                        layout={{ position: 'absolute', left: 8, width: 16, top: 11, height: 15 }}
                    />
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <RentableBotViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <RentableBotViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};
