import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2026_illumina_chat_bubble_xml` (layout "chat_bubble", 259x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaChatBubbleLayoutProps {
    bubbleWrapper?: IlluminaChatBubbleLayoutBubbleWrapperProps;
    layout?: BoxLayout;
    srcArrowPoint?: string;
}

export const IlluminaChatBubbleLayout = ({ bubbleWrapper, layout, srcArrowPoint }: IlluminaChatBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 259, height: 80, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}>
                <Region layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 56 }}>
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        layout={{ position: 'absolute', left: -19, width: 90, top: -21, height: 130 }}
                    />
                </Region>
                <ThemeImage
                    name="arrow_point"
                    src={srcArrowPoint ?? layoutImage('illumina_light_bubble_chat_arrow.png')}
                    layout={{ position: 'absolute', left: 47, width: 5, top: 39, height: 10 }}
                />
                <IlluminaChatBubbleLayoutBubbleWrapper {...bubbleWrapper} />
            </Region>
        </Region>
    );
};

/** Row template `user_name_region` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutUserNameRegionItemProps {
    captionUserName?: string;
    layout?: BoxLayout;
    onUserNameRegion?: () => void;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutUserNameRegionItem = ({ captionUserName, layout, onUserNameRegion, tags }: IlluminaChatBubbleLayoutUserNameRegionItemProps) => {
    return (
        <Region
            name="user_name_region"
            tags={tags}
            onPointerTap={onUserNameRegion}
            cursor="pointer"
            layout={{ width: 31, height: 15, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_name"
                layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserName ?? 'USER:'}
                    textStyle="text-style-il-border"
                    textOptions={{ fill: '#555555' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `post_time` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutPostTimeItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutPostTimeItem = ({ layout, tags }: IlluminaChatBubbleLayoutPostTimeItemProps) => {
    return (
        <WidgetSlot
            widgetType="updating_timestamp"
            name="post_time"
            tags={tags}
            layout={{ width: 131, height: 16, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `offline_placeholder` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutOfflinePlaceholderItemProps {
    captionOffline?: string;
    layout?: BoxLayout;
    onOfflinePlaceholder?: () => void;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutOfflinePlaceholderItem = ({ captionOffline, layout, onOfflinePlaceholder, tags }: IlluminaChatBubbleLayoutOfflinePlaceholderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="offline_placeholder"
            tags={tags}
            onPointerTap={onOfflinePlaceholder}
            cursor="pointer"
            layout={{ width: 250, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="offline"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOffline ?? t('messenger.notification.persisted_message_sent')} />
            </Region>
        </Region>
    );
};

/** Row template `spacing` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutSpacingItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutSpacingItem = ({ layout, tags }: IlluminaChatBubbleLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `message_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageTemplateItemProps {
    captionMessageTemplate?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutMessageTemplateItem = ({ captionMessageTemplate, layout, tags }: IlluminaChatBubbleLayoutMessageTemplateItemProps) => {
    return (
        <Region
            name="message_template"
            tags={tags}
            layout={{ width: 207, height: 4, flexShrink: 0, minHeight: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessageTemplate ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 207 }}
            />
        </Region>
    );
};

/** Row template `habbicon_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutHabbiconTemplateItemProps {
    layout?: BoxLayout;
    srcHabbiconBitmap?: string;
    tags?: string[];
    visibleHabbiconTemplate?: boolean;
}

export const IlluminaChatBubbleLayoutHabbiconTemplateItem = ({ layout, srcHabbiconBitmap, tags, visibleHabbiconTemplate }: IlluminaChatBubbleLayoutHabbiconTemplateItemProps) => {
    return (
        <Region
            name="habbicon_template"
            tags={tags}
            visible={visibleHabbiconTemplate ?? false}
            layout={{ width: 80, height: 80, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="habbicon_bitmap"
                src={srcHabbiconBitmap}
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
            />
        </Region>
    );
};

/** Row template `message_container` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageContainerItemProps {
    itemsMessageContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutMessageContainerItem = ({ itemsMessageContainer, layout, tags }: IlluminaChatBubbleLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
            tags={tags}
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsMessageContainer ?? (
                <>
                    <IlluminaChatBubbleLayoutMessageTemplateItem />
                    <IlluminaChatBubbleLayoutHabbiconTemplateItem />
                </>
            )}
        </Region>
    );
};

/** Row template `spacing` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutSpacingItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutSpacingItem2 = ({ layout, tags }: IlluminaChatBubbleLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spaced_message_container` of IlluminaChatBubbleLayout - configured through the parent's `spacedMessageContainer` prop. */
export interface IlluminaChatBubbleLayoutSpacedMessageContainerProps {
    itemsSpacedMessageContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutSpacedMessageContainer = ({ itemsSpacedMessageContainer, layout, tags }: IlluminaChatBubbleLayoutSpacedMessageContainerProps) => {
    return (
        <Region
            name="spaced_message_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', ...layout }}
        >
            {itemsSpacedMessageContainer ?? (
                <>
                    <IlluminaChatBubbleLayoutSpacingItem />
                    <IlluminaChatBubbleLayoutMessageContainerItem />
                    <IlluminaChatBubbleLayoutSpacingItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `message_region` of IlluminaChatBubbleLayout - configured through the parent's `messageRegion` prop. */
export interface IlluminaChatBubbleLayoutMessageRegionProps {
    layout?: BoxLayout;
    onMessageRegion?: () => void;
    spacedMessageContainer?: IlluminaChatBubbleLayoutSpacedMessageContainerProps;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutMessageRegion = ({ layout, onMessageRegion, spacedMessageContainer, tags }: IlluminaChatBubbleLayoutMessageRegionProps) => {
    return (
        <Region
            name="message_region"
            tags={tags}
            onPointerTap={onMessageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18, ...layout }}
        >
            <IlluminaChatBubbleLayoutSpacedMessageContainer {...spacedMessageContainer} />
        </Region>
    );
};

/** Named region `bubble_wrapper` of IlluminaChatBubbleLayout - configured through the parent's `bubbleWrapper` prop. */
export interface IlluminaChatBubbleLayoutBubbleWrapperProps {
    itemsBubbleWrapper?: ReactNode;
    layout?: BoxLayout;
    messageRegion?: IlluminaChatBubbleLayoutMessageRegionProps;
    tags?: string[];
}

export const IlluminaChatBubbleLayoutBubbleWrapper = ({ itemsBubbleWrapper, layout, messageRegion, tags }: IlluminaChatBubbleLayoutBubbleWrapperProps) => {
    return (
        <Region
            name="bubble_wrapper"
            tags={tags}
            layout={{ position: 'absolute', left: 52, top: 15, flexDirection: 'column', ...layout }}
        >
            {itemsBubbleWrapper ?? (
                <>
                    <IlluminaChatBubbleLayoutUserNameRegionItem />
                    <IlluminaChatBubbleLayoutPostTimeItem />
                    <IlluminaChatBubbleLayoutOfflinePlaceholderItem />
                </>
            )}
            <Border
                variant="106"
                layout={{ width: 207, height: 18, flexShrink: 0 }}
            >
                <IlluminaChatBubbleLayoutMessageRegion {...messageRegion} />
            </Border>
        </Region>
    );
};
