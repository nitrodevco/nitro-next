import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1310_inventory_trading_name_scam_warning_xml` (layout "inventory_trading_name_scam_warning", 356x333) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingNameScamWarningLayoutProps {
    contentList?: InventoryTradingNameScamWarningLayoutContentListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const InventoryTradingNameScamWarningLayout = ({ contentList, layout, onClose }: InventoryTradingNameScamWarningLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="inventory_trading_name_scam_warning_frame"
            name="inventory_trading_name_scam_warning_frame"
            caption={t('inventory.trading.namescam.title')}
            tintColor="#d43d59"
            onClose={onClose}
            layout={{ width: 356, height: 333, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <InventoryTradingNameScamWarningLayoutContentList {...contentList} />
            </Region>
        </Frame>
    );
};

/** Row template `warning_text` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutWarningTextItemProps {
    captionWarningText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutWarningTextItem = ({ captionWarningText, layout, tags }: InventoryTradingNameScamWarningLayoutWarningTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warning_text"
            tags={tags}
            layout={{ width: 330, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionWarningText ?? t('inventory.trading.namescam.warning')}
                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
            />
        </Region>
    );
};

/** Row template `trader_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutTraderSectionItemProps {
    captionTraderLabel?: string;
    captionTraderNameText?: string;
    layout?: BoxLayout;
    onOpenProfileButton?: () => void;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutTraderSectionItem = ({ captionTraderLabel, captionTraderNameText, layout, onOpenProfileButton, tags }: InventoryTradingNameScamWarningLayoutTraderSectionItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="4"
            name="trader_section"
            tags={tags}
            tintColor="#f1f1f1"
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="avatar_image"
                name="trader_avatar"
                options={{ 'avatar_image:only_head': 'true' }}
                layout={{ position: 'absolute', left: -10, width: 90, top: -24, height: 130 }}
            />
            <Region
                name="trader_label"
                layout={{ position: 'absolute', left: 63, width: 72, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTraderLabel ?? t('inventory.trading.namescam.trader')}
                    textOptions={{ fill: '#555555' }}
                />
            </Region>
            <Region
                name="trader_name_text"
                layout={{ position: 'absolute', left: 63, width: 44, top: 29, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTraderNameText ?? 'Habbo'} />
            </Region>
            <Button
                variant="3"
                name="open_profile_button"
                onPointerTap={onOpenProfileButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 16, width: 90, top: 16, height: 26 }}
            >
                {t('inventory.trading.namescam.open_profile')}
            </Button>
        </Border>
    );
};

/** Row template `room_matches_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutRoomMatchesSectionItemProps {
    captionRoomMatchesHeader?: string;
    captionRoomMatchesText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem = ({ captionRoomMatchesHeader, captionRoomMatchesText, layout, tags }: InventoryTradingNameScamWarningLayoutRoomMatchesSectionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_matches_section"
            tags={tags}
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_matches_header"
                layout={{ position: 'absolute', left: 0, width: 138, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomMatchesHeader ?? t('inventory.trading.namescam.similar_in_room')} />
            </Region>
            <Region
                name="room_matches_text"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomMatchesText ?? 'User 1'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `friend_matches_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutFriendMatchesSectionItemProps {
    captionFriendMatchesHeader?: string;
    captionFriendMatchesText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem = ({ captionFriendMatchesHeader, captionFriendMatchesText, layout, tags }: InventoryTradingNameScamWarningLayoutFriendMatchesSectionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friend_matches_section"
            tags={tags}
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            <Region
                name="friend_matches_header"
                layout={{ position: 'absolute', left: 0, width: 172, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionFriendMatchesHeader ?? t('inventory.trading.namescam.similar_in_friends')} />
            </Region>
            <Region
                name="friend_matches_text"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFriendMatchesText ?? 'Friend 1'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `close_button` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutCloseButtonItem = ({ layout, onCloseButton, tags }: InventoryTradingNameScamWarningLayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="close_button"
            tags={tags}
            onPointerTap={onCloseButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 50, height: 26, flexShrink: 0, ...layout }}
        >
            {t('inventory.trading.namescam.close')}
        </Button>
    );
};

/** Row template `close_countdown_text` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutCloseCountdownTextItemProps {
    captionCloseCountdownText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutCloseCountdownTextItem = ({ captionCloseCountdownText, layout, tags }: InventoryTradingNameScamWarningLayoutCloseCountdownTextItemProps) => {
    return (
        <Region
            name="close_countdown_text"
            tags={tags}
            layout={{ width: 16, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCloseCountdownText ?? '3s'}
                textOptions={{ fill: '#555555' }}
            />
        </Region>
    );
};

/** Row template `button_container` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutButtonContainerItemProps {
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutButtonContainerItem = ({ itemsButtonContainer, layout, tags }: InventoryTradingNameScamWarningLayoutButtonContainerItemProps) => {
    return (
        <Region
            name="button_container"
            tags={tags}
            layout={{ width: 73, height: 30, flexShrink: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsButtonContainer ?? (
                <>
                    <InventoryTradingNameScamWarningLayoutCloseButtonItem />
                    <InventoryTradingNameScamWarningLayoutCloseCountdownTextItem />
                </>
            )}
        </Region>
    );
};

/** Named region `content_list` of InventoryTradingNameScamWarningLayout - configured through the parent's `contentList` prop. */
export interface InventoryTradingNameScamWarningLayoutContentListProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingNameScamWarningLayoutContentList = ({ itemsContentList, layout, tags }: InventoryTradingNameScamWarningLayoutContentListProps) => {
    return (
        <Region
            name="content_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, right: 16, top: 8, height: 280, flexDirection: 'column', gap: 8, ...layout }}
        >
            {itemsContentList ?? (
                <>
                    <InventoryTradingNameScamWarningLayoutWarningTextItem />
                    <InventoryTradingNameScamWarningLayoutTraderSectionItem />
                    <InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem />
                    <InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem />
                    <InventoryTradingNameScamWarningLayoutButtonContainerItem />
                </>
            )}
        </Region>
    );
};
