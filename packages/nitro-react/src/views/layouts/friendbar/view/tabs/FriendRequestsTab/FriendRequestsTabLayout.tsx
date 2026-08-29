import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, ButtonThick, CloseButton, Region, ThemeText } from '#base/theme';

import { FriendRequestsTabLayoutHeaderItem } from './FriendRequestsTabLayoutHeaderItem';
import { FriendRequestsTabLayoutRequestEntityList, FriendRequestsTabLayoutRequestEntityListProps } from './FriendRequestsTabLayoutRequestEntityList';

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
                            <Region layout={{ position: 'absolute', left: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
