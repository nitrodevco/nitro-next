import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `31_entity_xml` (layout "entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EntityLayoutProps {
    bubbleClickRegionReject?: EntityLayoutBubbleClickRegionRejectProps;
    captionBubbleCaption?: string;
    captionBubbleMessage?: string;
    captionBubbleTitle?: string;
    icons?: EntityLayoutIconsProps;
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
    pieces?: EntityLayoutPiecesProps;
    visibleBubble?: boolean;
}

export const EntityLayout = ({ bubbleClickRegionReject, captionBubbleCaption, captionBubbleMessage, captionBubbleTitle, icons, layout, onBubbleButtonAccept, onBubbleButtonClose, pieces, visibleBubble }: EntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#a5cd5d"
                layout={{ position: 'absolute', left: 0, width: 127, top: 101, height: 36 }}
            >
                <EntityLayoutIcons {...icons} />
                <EntityLayoutPieces {...pieces} />
                <Region
                    visible={visibleBubble ?? true}
                    layout={{ position: 'absolute', left: -6, width: 139, top: -113, height: 120 }}
                >
                    <Bubble
                        variant="0"
                        name="bubble"
                        tintColor="#9dbf5a"
                        layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
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
                        <EntityLayoutBubbleClickRegionReject {...bubbleClickRegionReject} />
                    </Bubble>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `icons` of EntityLayout - configured through the parent's `icons` prop. */
export interface EntityLayoutIconsProps {
    layout?: BoxLayout;
}

export const EntityLayoutIcons = ({ layout }: EntityLayoutIconsProps) => {
    return (
        <Region
            name="icons"
            layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Named region `region_profile` of EntityLayout - configured through the parent's `regionProfile` prop. */
export interface EntityLayoutRegionProfileProps {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
}

export const EntityLayoutRegionProfile = ({ layout, onRegionProfile, srcCanvas }: EntityLayoutRegionProfileProps) => {
    return (
        <Region
            name="region_profile"
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 86, top: 0, height: 24, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70, justifyContent: 'center' }}>
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `header` of EntityLayout - pass real rows through its `items…` slot. */
export interface EntityLayoutHeaderItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    regionProfile?: EntityLayoutRegionProfileProps;
}

export const EntityLayoutHeaderItem = ({ captionName, layout, onHeader, regionProfile }: EntityLayoutHeaderItemProps) => {
    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 119, height: 24, flexShrink: 0, ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 33, width: 86, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <EntityLayoutRegionProfile {...regionProfile} />
        </Region>
    );
};

/** Named region `pieces` of EntityLayout - configured through the parent's `pieces` prop. */
export interface EntityLayoutPiecesProps {
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
}

export const EntityLayoutPieces = ({ itemsPieces, layout }: EntityLayoutPiecesProps) => {
    return (
        <Region
            name="pieces"
            layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -1, minHeight: 30, flexDirection: 'column', ...layout }}
        >
            {itemsPieces ?? (
                <EntityLayoutHeaderItem />
            )}
        </Region>
    );
};

/** Named region `bubble_click_region_reject` of EntityLayout - configured through the parent's `bubbleClickRegionReject` prop. */
export interface EntityLayoutBubbleClickRegionRejectProps {
    captionBubbleLinkReject?: string;
    layout?: BoxLayout;
    onBubbleClickRegionReject?: () => void;
}

export const EntityLayoutBubbleClickRegionReject = ({ captionBubbleLinkReject, layout, onBubbleClickRegionReject }: EntityLayoutBubbleClickRegionRejectProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bubble_click_region_reject"
            onPointerTap={onBubbleClickRegionReject}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15, ...layout }}
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
    );
};
