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
}

export const IlluminaChatBubbleLayoutUserNameRegionItem = ({ captionUserName, layout, onUserNameRegion }: IlluminaChatBubbleLayoutUserNameRegionItemProps) => {
    return (
        <Region
            name="user_name_region"
            layout={{ width: 31, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onUserNameRegion}
            cursor="pointer"
        >
            <ThemeText
                text={captionUserName ?? 'USER:'}
                textStyle="text-style-il-border"
                textOptions={{ fill: '#555555' }}
            />
        </Region>
    );
};

/** Row template `post_time` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutPostTimeItemProps {
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutPostTimeItem = ({ layout }: IlluminaChatBubbleLayoutPostTimeItemProps) => {
    return (
        <WidgetSlot
            widgetType="updating_timestamp"
            name="post_time"
            layout={{ width: 131, height: 16, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `offline_placeholder` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutOfflinePlaceholderItemProps {
    captionOffline?: string;
    layout?: BoxLayout;
    onOfflinePlaceholder?: () => void;
}

export const IlluminaChatBubbleLayoutOfflinePlaceholderItem = ({ captionOffline, layout, onOfflinePlaceholder }: IlluminaChatBubbleLayoutOfflinePlaceholderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="offline_placeholder"
            layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onOfflinePlaceholder}
            cursor="pointer"
        >
            {captionOffline ?? t('messenger.notification.persisted_message_sent')}
        </Region>
    );
};

/** Row template `spacing` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutSpacingItem = ({ layout }: IlluminaChatBubbleLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `message_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageTemplateItemProps {
    captionMessageTemplate?: string;
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutMessageTemplateItem = ({ captionMessageTemplate, layout }: IlluminaChatBubbleLayoutMessageTemplateItemProps) => {
    return (
        <Region
            name="message_template"
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
    visibleHabbiconTemplate?: boolean;
}

export const IlluminaChatBubbleLayoutHabbiconTemplateItem = ({ layout, srcHabbiconBitmap, visibleHabbiconTemplate }: IlluminaChatBubbleLayoutHabbiconTemplateItemProps) => {
    return (
        (visibleHabbiconTemplate ?? false) && (
            <Region
                name="habbicon_template"
                layout={{ width: 80, height: 80, flexShrink: 0, ...layout }}
            >
                <ThemeImage
                    name="habbicon_bitmap"
                    src={srcHabbiconBitmap}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
                />
            </Region>
        )
    );
};

/** Row template `message_container` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageContainerItemProps {
    itemsMessageContainer?: ReactNode;
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutMessageContainerItem = ({ itemsMessageContainer, layout }: IlluminaChatBubbleLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
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
}

export const IlluminaChatBubbleLayoutSpacingItem2 = ({ layout }: IlluminaChatBubbleLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `message_region` of IlluminaChatBubbleLayout - configured through the parent's `messageRegion` prop. */
export interface IlluminaChatBubbleLayoutMessageRegionProps {
    itemsSpacedMessageContainer?: ReactNode;
    layout?: BoxLayout;
    onMessageRegion?: () => void;
}

export const IlluminaChatBubbleLayoutMessageRegion = ({ itemsSpacedMessageContainer, layout, onMessageRegion }: IlluminaChatBubbleLayoutMessageRegionProps) => {
    return (
        <Region
            name="message_region"
            onPointerTap={onMessageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18, ...layout }}
        >
            <Region
                name="spaced_message_container"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
            >
                {itemsSpacedMessageContainer ?? (
                    <>
                        <IlluminaChatBubbleLayoutSpacingItem />
                        <IlluminaChatBubbleLayoutMessageContainerItem />
                        <IlluminaChatBubbleLayoutSpacingItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Named region `bubble_wrapper` of IlluminaChatBubbleLayout - configured through the parent's `bubbleWrapper` prop. */
export interface IlluminaChatBubbleLayoutBubbleWrapperProps {
    itemsBubbleWrapper?: ReactNode;
    layout?: BoxLayout;
    messageRegion?: IlluminaChatBubbleLayoutMessageRegionProps;
}

export const IlluminaChatBubbleLayoutBubbleWrapper = ({ itemsBubbleWrapper, layout, messageRegion }: IlluminaChatBubbleLayoutBubbleWrapperProps) => {
    return (
        <Region
            name="bubble_wrapper"
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
