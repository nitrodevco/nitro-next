import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, ButtonThick, CloseButton, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `7_friend_requests_tab_xml` (layout "friendRequestsTab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestsTabLayoutProps {
    captionBadgeCounter?: string;
    captionTitle?: string;
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
    onButtonAcceptAll?: () => void;
    onButtonClose?: () => void;
    onClickAreaDiscardAll?: () => void;
    requestEntityList?: FriendRequestsTabLayoutRequestEntityListProps;
    visibleBubble?: boolean;
}

export const FriendRequestsTabLayout = ({ captionBadgeCounter, captionTitle, itemsTabContent, layout, onButtonAcceptAll, onButtonClose, onClickAreaDiscardAll, requestEntityList, visibleBubble }: FriendRequestsTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#fac919"
                layout={{ position: 'absolute', left: 39, width: 127, top: 292, height: 36 }}
            >
                <Region
                    name="tab_content"
                    layout={{ position: 'absolute', left: 7, right: 4, top: 3, height: 40, minHeight: 40, flexDirection: 'column' }}
                >
                    {itemsTabContent ?? (
                        <FriendRequestsTabLayoutHeaderItem />
                    )}
                </Region>
                {(visibleBubble ?? true) && (
                    <Bubble
                        variant="0"
                        name="bubble"
                        tintColor="#fac919"
                        layout={{ position: 'absolute', left: -45, width: 222, bottom: 30, height: 304 }}
                    >
                        <Region
                            name="title"
                            layout={{ position: 'absolute', left: 0, width: 204, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionTitle ?? t('friendbar.requests.title')}
                                textStyle="text-style-u-frame-title"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                        <CloseButton
                            variant="3"
                            name="button_close"
                            onPointerTap={onButtonClose}
                            layout={{ position: 'absolute', left: 184, width: 19, top: 3, height: 20 }}
                        />
                        <FriendRequestsTabLayoutRequestEntityList {...requestEntityList} />
                        {/* <scrollbar_vertical> for request_entity_list - rendered by that list's ScrollArea */}
                        <Region
                            name="click_area_discard_all"
                            onPointerTap={onClickAreaDiscardAll}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 11, width: 143, bottom: 30, height: 16 }}
                        >
                            <Region layout={{ position: 'absolute', left: 0, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('friendbar.requests.discard')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            backgroundColor="#564620"
                            layout={{ position: 'absolute', left: 4, width: 184, top: 27, height: 1 }}
                        />
                        <Region
                            backgroundColor="#564620"
                            layout={{ position: 'absolute', left: 4, width: 184, bottom: 57, height: 1 }}
                        />
                        <ButtonThick
                            variant="5"
                            name="button_accept_all"
                            tintColor="#77bf43"
                            onPointerTap={onButtonAcceptAll}
                            layout={{ position: 'absolute', right: 23, width: 171, bottom: 22, height: 28 }}
                        >
                            {t('friendbar.requests.accept')}
                        </ButtonThick>
                    </Bubble>
                )}
                <Border
                    variant="7"
                    tintColor="#de4537"
                    layout={{ position: 'absolute', right: 10, width: 18, top: -8, height: 20 }}
                >
                    <Region
                        name="badge_counter"
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBadgeCounter ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Border>
            </Border>
        </Region>
    );
};

/** Row template `header` of FriendRequestsTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestsTabLayoutHeaderItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
}

export const FriendRequestsTabLayoutHeaderItem = ({ captionLabel, layout, onHeader, srcIcon }: FriendRequestsTabLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 112, height: 31, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('add_friends_icon.png')}
                layout={{ position: 'absolute', right: 83, width: 31, bottom: 2, height: 34 }}
            />
            <Region
                name="label"
                layout={{ position: 'absolute', left: 29, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabel ?? t('friendbar.requests.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `request_entity` of FriendRequestsTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestsTabLayoutRequestEntityItemProps {
    captionName?: string;
    captionTextDiscard?: string;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onClickAreaDiscard?: () => void;
    onRegionProfile?: () => void;
    onRegionProfileName?: () => void;
    srcCanvas?: string;
}

export const FriendRequestsTabLayoutRequestEntityItem = ({ captionName, captionTextDiscard, layout, onButtonAccept, onClickAreaDiscard, onRegionProfile, onRegionProfileName, srcCanvas }: FriendRequestsTabLayoutRequestEntityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_entity"
            backgroundColor="#ab8710"
            layout={{ width: 196, height: 50, flexShrink: 0, ...layout }}
        >
            <Region
                name="region_profile"
                onPointerTap={onRegionProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 1, right: 156, top: 3, height: 44 }}
            >
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 44 }}
                />
            </Region>
            <Region
                name="region_profile_name"
                layout={{ position: 'absolute', left: 43, right: 15, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onRegionProfileName}
                cursor="pointer"
            >
                <ThemeText
                    text={captionName ?? 'Name'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="click_area_discard"
                onPointerTap={onClickAreaDiscard}
                cursor="pointer"
                layout={{ position: 'absolute', left: 42, width: 119, top: 25, height: 18 }}
            >
                <Region
                    name="text_discard"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextDiscard ?? t('friendbar.request.decline')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Button
                variant="3"
                name="button_accept"
                onPointerTap={onButtonAccept}
                layout={{ position: 'absolute', right: 23, width: 80, top: 22, height: 22, maxWidth: 80 }}
            >
                {t('friendbar.request.accept')}
            </Button>
        </Region>
    );
};

/** Named region `request_entity_list` of FriendRequestsTabLayout - configured through the parent's `requestEntityList` prop. */
export interface FriendRequestsTabLayoutRequestEntityListProps {
    itemsRequestEntityList?: ReactNode;
    layout?: BoxLayout;
}

export const FriendRequestsTabLayoutRequestEntityList = ({ itemsRequestEntityList, layout }: FriendRequestsTabLayoutRequestEntityListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 196, top: 27, height: 220, maxHeight: 220, ...layout }}
        >
            <Region
                name="request_entity_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsRequestEntityList ?? (
                    <FriendRequestsTabLayoutRequestEntityItem />
                )}
            </Region>
        </ScrollArea>
    );
};
