import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2907_guide_accept_xml` (layout "guide_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideAcceptLayoutProps {
    itemlist?: GuideAcceptLayoutItemlistProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcFrankGreeting?: string;
}

export const GuideAcceptLayout = ({ itemlist, layout, onClose, srcFrankGreeting }: GuideAcceptLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_accept"
            name="guide_accept"
            params={32769}
            caption={t('guide.help.request.guide.accept.title')}
            onClose={onClose}
            layout={{ width: 282, height: 276, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
                    name="border"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 280, top: 20, height: 224 }}
                >
                    <GuideAcceptLayoutItemlist {...itemlist} />
                </Border>
                <ThemeImage
                    params={16}
                    src={layoutImage('help_guide_accept.png')}
                    layout={{ position: 'absolute', left: 0, width: 70, top: 20, height: 80 }}
                />
                <Border
                    variant="102"
                    params={16}
                    layout={{ position: 'absolute', left: 185, width: 80, top: 0, height: 50 }}
                >
                    <WidgetSlot
                        widgetType="countdown"
                        name="countdown"
                        params={147472}
                        options={{ 'countdown:digits': '2' }}
                        layout={{ position: 'absolute', left: 10, width: 63, top: 10, height: 37 }}
                    />
                </Border>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: -10, width: 230, bottom: -19, height: 140 }}
                >
                    <ThemeImage
                        name="frank_greeting"
                        params={1040}
                        src={srcFrankGreeting ?? layoutImage('help_frank_greeting.png')}
                        layout={{ position: 'absolute', left: -10, width: 230, bottom: -19, height: 140 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `request_title` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestTitleItemProps {
    captionRequestTitle?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestTitleItem = ({ captionRequestTitle, layout }: GuideAcceptLayoutRequestTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_title"
            params={16}
            layout={{ width: 170, height: 47, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestTitle ?? t('guide.help.request.guide.accept.request.title')}
                textStyle="text-style-il-heading-2"
            />
        </Region>
    );
};

/** Row template `request_type` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestTypeItemProps {
    captionRequestType?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestTypeItem = ({ captionRequestType, layout }: GuideAcceptLayoutRequestTypeItemProps) => {
    return (
        <Region
            name="request_type"
            params={16}
            layout={{ width: 73, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionRequestType ?? 'Request type'} />
        </Region>
    );
};

/** Row template `request_description` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuideAcceptLayoutRequestDescriptionItemProps) => {
    return (
        <Region
            name="request_description"
            params={16}
            layout={{ width: 195, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestDescription ?? 'Help message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            />
        </Region>
    );
};

/** Row template `request_description_wrapper` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestDescriptionWrapperItemProps {
    itemsRequestDescriptionWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestDescriptionWrapperItem = ({ itemsRequestDescriptionWrapper, layout }: GuideAcceptLayoutRequestDescriptionWrapperItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 205, height: 80, flexShrink: 0, ...layout }}
        >
            <Region
                name="request_description_wrapper"
                params={16}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsRequestDescriptionWrapper ?? (
                    <GuideAcceptLayoutRequestDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Row template `accept_button` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutAcceptButtonItemProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
}

export const GuideAcceptLayoutAcceptButtonItem = ({ layout, onAcceptButton }: GuideAcceptLayoutAcceptButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="101"
            name="accept_button"
            params={180241}
            tintColor="#bbbbbb"
            onPointerTap={onAcceptButton}
            layout={{ width: 200, height: 48, flexShrink: 0, maxWidth: 200, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('guide.help.request.user.pending.cancel.button')}
            <Region
                params={8536080}
                layout={{ position: 'absolute', left: 20, top: 11, maxWidth: 200, flexDirection: 'row', gap: 5 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('help_accept_icon.png')}
                    layout={{ width: 11, height: 12, flexShrink: 0 }}
                />
                <Region
                    params={16}
                    layout={{ width: 244, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('guide.help.request.guide.accept.accept.button')}
                        textStyle="text-style-il-button"
                    />
                </Region>
            </Region>
        </ContainerButton>
    );
};

/** Row template `skip_link` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutSkipLinkItemProps {
    captionSkipLink?: string;
    layout?: BoxLayout;
    onSkipLink?: () => void;
}

export const GuideAcceptLayoutSkipLinkItem = ({ captionSkipLink, layout, onSkipLink }: GuideAcceptLayoutSkipLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="skip_link"
            params={1}
            layout={{ width: 212, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onSkipLink}
            cursor="pointer"
        >
            <ThemeText text={captionSkipLink ?? t('guide.help.request.guide.accept.skip.link')} />
        </Region>
    );
};

/** Named region `itemlist` of GuideAcceptLayout - configured through the parent's `itemlist` prop. */
export interface GuideAcceptLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutItemlist = ({ itemsItemlist, layout }: GuideAcceptLayoutItemlistProps) => {
    return (
        <Region
            name="itemlist"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 221, flexDirection: 'column', ...layout }}
        >
            {itemsItemlist ?? (
                <>
                    <GuideAcceptLayoutRequestTitleItem />
                    <GuideAcceptLayoutRequestTypeItem />
                    <GuideAcceptLayoutRequestDescriptionWrapperItem />
                    <GuideAcceptLayoutAcceptButtonItem />
                    <GuideAcceptLayoutSkipLinkItem />
                </>
            )}
        </Region>
    );
};
