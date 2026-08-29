import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, ButtonThick, CloseButton, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `7_friend_requests_tab_xml` (layout "friendRequestsTab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestsTabLayoutProps {
    captionBadgeCounter?: string;
    captionTitle?: string;
    clickAreaDiscardAll?: FriendRequestsTabLayoutClickAreaDiscardAllProps;
    layout?: BoxLayout;
    onButtonAcceptAll?: () => void;
    onButtonClose?: () => void;
    requestEntityList?: FriendRequestsTabLayoutRequestEntityListProps;
    tabContent?: FriendRequestsTabLayoutTabContentProps;
    visibleBubble?: boolean;
}

export const FriendRequestsTabLayout = ({ captionBadgeCounter, captionTitle, clickAreaDiscardAll, layout, onButtonAcceptAll, onButtonClose, requestEntityList, tabContent, visibleBubble }: FriendRequestsTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#fac919"
                layout={{ position: 'absolute', left: 39, width: 127, top: 292, height: 36 }}
            >
                <FriendRequestsTabLayoutTabContent {...tabContent} />
                <Region
                    visible={visibleBubble ?? true}
                    layout={{ position: 'absolute', left: -45, width: 222, bottom: 30, height: 304 }}
                >
                    <Bubble
                        variant="0"
                        name="bubble"
                        params={1048577}
                        tintColor="#fac919"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="title"
                            params={16}
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
                            params={17}
                            onPointerTap={onButtonClose}
                            layout={{ position: 'absolute', left: 184, width: 19, top: 3, height: 20 }}
                        />
                        <FriendRequestsTabLayoutRequestEntityList {...requestEntityList} />
                        {/* <scrollbar_vertical> for request_entity_list - rendered by that list's ScrollArea */}
                        <FriendRequestsTabLayoutClickAreaDiscardAll {...clickAreaDiscardAll} />
                        <Region
                            params={16}
                            backgroundColor="#564620"
                            layout={{ position: 'absolute', left: 4, width: 184, top: 27, height: 1 }}
                        />
                        <Region
                            params={1040}
                            backgroundColor="#564620"
                            layout={{ position: 'absolute', left: 4, width: 184, bottom: 57, height: 1 }}
                        />
                        <ButtonThick
                            variant="5"
                            name="button_accept_all"
                            params={394321}
                            tintColor="#77bf43"
                            onPointerTap={onButtonAcceptAll}
                            layout={{ position: 'absolute', right: 23, width: 171, bottom: 22, height: 28 }}
                        >
                            {t('friendbar.requests.accept')}
                        </ButtonThick>
                    </Bubble>
                </Region>
                <Border
                    variant="7"
                    params={409600}
                    tintColor="#de4537"
                    layout={{ position: 'absolute', right: 10, width: 18, top: -8, height: 20 }}
                >
                    <Region
                        name="badge_counter"
                        params={16}
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
            params={145}
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 112, height: 31, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={1310720}
                src={srcIcon ?? layoutImage('add_friends_icon.png')}
                layout={{ position: 'absolute', right: 83, width: 31, bottom: 2, height: 34 }}
            />
            <Region
                name="label"
                tags={[ 'label' ]}
                params={3148816}
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

/** Named region `tab_content` of FriendRequestsTabLayout - configured through the parent's `tabContent` prop. */
export interface FriendRequestsTabLayoutTabContentProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const FriendRequestsTabLayoutTabContent = ({ itemsTabContent, layout }: FriendRequestsTabLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={8388752}
            layout={{ position: 'absolute', left: 7, right: 4, top: 3, height: 40, minHeight: 40, flexDirection: 'column', ...layout }}
        >
            {itemsTabContent ?? (
                <FriendRequestsTabLayoutHeaderItem />
            )}
        </Region>
    );
};

/** Named region `region_profile` of FriendRequestsTabLayout - configured through the parent's `regionProfile` prop. */
export interface FriendRequestsTabLayoutRegionProfileProps {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
}

export const FriendRequestsTabLayoutRegionProfile = ({ layout, onRegionProfile, srcCanvas }: FriendRequestsTabLayoutRegionProfileProps) => {
    return (
        <Region
            name="region_profile"
            params={145}
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, right: 156, top: 3, height: 44, ...layout }}
        >
            <ThemeImage
                name="canvas"
                params={16}
                src={srcCanvas}
                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 44 }}
            />
        </Region>
    );
};

/** Named region `region_profile_name` of FriendRequestsTabLayout - configured through the parent's `regionProfileName` prop. */
export interface FriendRequestsTabLayoutRegionProfileNameProps {
    captionName?: string;
    layout?: BoxLayout;
    onRegionProfileName?: () => void;
}

export const FriendRequestsTabLayoutRegionProfileName = ({ captionName, layout, onRegionProfileName }: FriendRequestsTabLayoutRegionProfileNameProps) => {
    return (
        <Region
            name="region_profile_name"
            params={145}
            onPointerTap={onRegionProfileName}
            cursor="pointer"
            layout={{ position: 'absolute', left: 43, right: 15, top: 6, height: 17, ...layout }}
        >
            <Region
                name="name"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 138, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? 'Name'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `click_area_discard` of FriendRequestsTabLayout - configured through the parent's `clickAreaDiscard` prop. */
export interface FriendRequestsTabLayoutClickAreaDiscardProps {
    captionTextDiscard?: string;
    layout?: BoxLayout;
    onClickAreaDiscard?: () => void;
}

export const FriendRequestsTabLayoutClickAreaDiscard = ({ captionTextDiscard, layout, onClickAreaDiscard }: FriendRequestsTabLayoutClickAreaDiscardProps) => {
    const t = useTranslation();

    return (
        <Region
            name="click_area_discard"
            params={17}
            onPointerTap={onClickAreaDiscard}
            cursor="pointer"
            layout={{ position: 'absolute', left: 42, width: 119, top: 25, height: 18, ...layout }}
        >
            <Region
                name="text_discard"
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextDiscard ?? t('friendbar.request.decline')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `request_entity` of FriendRequestsTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestsTabLayoutRequestEntityItemProps {
    clickAreaDiscard?: FriendRequestsTabLayoutClickAreaDiscardProps;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    regionProfile?: FriendRequestsTabLayoutRegionProfileProps;
    regionProfileName?: FriendRequestsTabLayoutRegionProfileNameProps;
}

export const FriendRequestsTabLayoutRequestEntityItem = ({ clickAreaDiscard, layout, onButtonAccept, regionProfile, regionProfileName }: FriendRequestsTabLayoutRequestEntityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_entity"
            params={16}
            backgroundColor="#ab8710"
            layout={{ width: 196, height: 50, flexShrink: 0, ...layout }}
        >
            <FriendRequestsTabLayoutRegionProfile {...regionProfile} />
            <FriendRequestsTabLayoutRegionProfileName {...regionProfileName} />
            <FriendRequestsTabLayoutClickAreaDiscard {...clickAreaDiscard} />
            <Button
                variant="3"
                name="button_accept"
                params={393233}
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
                params={8388624}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsRequestEntityList ?? (
                    <FriendRequestsTabLayoutRequestEntityItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `click_area_discard_all` of FriendRequestsTabLayout - configured through the parent's `clickAreaDiscardAll` prop. */
export interface FriendRequestsTabLayoutClickAreaDiscardAllProps {
    layout?: BoxLayout;
    onClickAreaDiscardAll?: () => void;
}

export const FriendRequestsTabLayoutClickAreaDiscardAll = ({ layout, onClickAreaDiscardAll }: FriendRequestsTabLayoutClickAreaDiscardAllProps) => {
    const t = useTranslation();

    return (
        <Region
            name="click_area_discard_all"
            params={1041}
            onPointerTap={onClickAreaDiscardAll}
            cursor="pointer"
            layout={{ position: 'absolute', left: 11, width: 143, bottom: 30, height: 16, ...layout }}
        >
            <Region
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('friendbar.requests.discard')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
