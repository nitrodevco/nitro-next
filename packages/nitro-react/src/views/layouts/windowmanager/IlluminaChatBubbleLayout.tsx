import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2026_illumina_chat_bubble_xml` (layout "chat_bubble", 259x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaChatBubbleLayoutProps {
    itemsBubbleWrapper?: ReactNode;
    itemsSpacedMessageContainer?: ReactNode;
    layout?: BoxLayout;
    onMessageRegion?: () => void;
    srcArrowPoint?: string;
}

export const IlluminaChatBubbleLayout = ({ itemsBubbleWrapper, itemsSpacedMessageContainer, layout, onMessageRegion, srcArrowPoint }: IlluminaChatBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 259, height: 80, ...layout }}>
            <Region
                params={147600}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 56 }}
                >
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        params={16}
                        layout={{ position: 'absolute', left: -19, width: 90, top: -21, height: 130 }}
                    />
                </Region>
                <ThemeImage
                    name="arrow_point"
                    params={16}
                    src={srcArrowPoint ?? layoutImage('illumina_light_bubble_chat_arrow.png')}
                    layout={{ position: 'absolute', left: 47, width: 5, top: 39, height: 10 }}
                />
                <Region
                    name="bubble_wrapper"
                    params={147472}
                    layout={{ position: 'absolute', left: 52, top: 15, flexDirection: 'column' }}
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
                        params={147472}
                        layout={{ width: 207, height: 18, flexShrink: 0 }}
                    >
                        <Region
                            name="message_region"
                            params={147473}
                            onPointerTap={onMessageRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18 }}
                        >
                            <Region
                                name="spaced_message_container"
                                params={147472}
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
                    </Border>
                </Region>
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
            params={147473}
            onPointerTap={onUserNameRegion}
            cursor="pointer"
            layout={{ width: 31, height: 15, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_name"
                params={16}
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
}

export const IlluminaChatBubbleLayoutPostTimeItem = ({ layout }: IlluminaChatBubbleLayoutPostTimeItemProps) => {
    return (
        <WidgetSlot
            widgetType="updating_timestamp"
            name="post_time"
            params={147472}
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
            params={147473}
            onPointerTap={onOfflinePlaceholder}
            cursor="pointer"
            layout={{ width: 250, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="offline"
                params={16400}
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
}

export const IlluminaChatBubbleLayoutSpacingItem = ({ layout }: IlluminaChatBubbleLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            params={16}
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
            params={16}
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
        <Region
            name="habbicon_template"
            params={16}
            visible={visibleHabbiconTemplate ?? false}
            layout={{ width: 80, height: 80, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="habbicon_bitmap"
                params={16}
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
}

export const IlluminaChatBubbleLayoutMessageContainerItem = ({ itemsMessageContainer, layout }: IlluminaChatBubbleLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
            params={147472}
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
            params={16}
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        />
    );
};
