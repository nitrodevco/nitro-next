import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

import { BotViewLayoutInfostandElementList, BotViewLayoutInfostandElementListProps } from './BotViewLayoutInfostandElementList';

/** Generated from `896_bot_view_xml` (layout "bot_view", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BotViewLayoutProps {
    infostandElementList?: BotViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BotViewLayout = ({ infostandElementList, layout, onClose }: BotViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <BotViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
            </Region>
        </Region>
    );
};
