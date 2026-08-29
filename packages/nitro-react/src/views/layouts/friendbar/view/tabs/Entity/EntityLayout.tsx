import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

import { EntityLayoutHeaderItem } from './EntityLayoutHeaderItem';

/** Generated from `31_entity_xml` (layout "entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EntityLayoutProps {
    captionBubbleCaption?: string;
    captionBubbleLinkReject?: string;
    captionBubbleMessage?: string;
    captionBubbleTitle?: string;
    itemsIcons?: ReactNode;
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
    onBubbleClickRegionReject?: () => void;
    visibleBubble?: boolean;
}

export const EntityLayout = ({ captionBubbleCaption, captionBubbleLinkReject, captionBubbleMessage, captionBubbleTitle, itemsIcons, itemsPieces, layout, onBubbleButtonAccept, onBubbleButtonClose, onBubbleClickRegionReject, visibleBubble }: EntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#a5cd5d"
                layout={{ position: 'absolute', left: 0, width: 127, top: 101, height: 36 }}
            >
                <Region
                    name="icons"
                    layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2 }}
                >
                    {itemsIcons}
                </Region>
                <Region
                    name="pieces"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -1, minHeight: 30, flexDirection: 'column' }}
                >
                    {itemsPieces ?? (
                        <EntityLayoutHeaderItem />
                    )}
                </Region>
                {(visibleBubble ?? true) && (
                    <Bubble
                        variant="0"
                        name="bubble"
                        tintColor="#9dbf5a"
                        layout={{ position: 'absolute', left: -6, width: 139, top: -113, height: 120, justifyContent: 'center' }}
                    >
                        <Region
                            name="bubble_title"
                            layout={{ position: 'absolute', left: 5, right: 41, top: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionBubbleTitle ?? t('friendbar.game_invite.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93, align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="bubble_message"
                            layout={{ position: 'absolute', left: 5, right: 24, top: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionBubbleMessage ?? ''}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                            />
                        </Region>
                        <CloseButton
                            variant="3"
                            name="bubble_button_close"
                            onPointerTap={onBubbleButtonClose}
                            layout={{ position: 'absolute', right: 19, width: 19, top: 3, height: 20 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="bubble_button_accept"
                            onPointerTap={onBubbleButtonAccept}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 47, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="8"
                                name="bubble_icon"
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                            />
                            <Region
                                name="bubble_caption"
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionBubbleCaption ?? t('friendbar.request.accept')}
                                    textStyle="text-style-button-shiny-bold"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                        <Region
                            name="bubble_click_region_reject"
                            onPointerTap={onBubbleClickRegionReject}
                            cursor="pointer"
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15 }}
                        >
                            <Region
                                name="bubble_link_reject"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionBubbleLinkReject ?? t('friendbar.request.decline')}
                                    textStyle="text-style-u-small"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Bubble>
                )}
            </Border>
        </Region>
    );
};
