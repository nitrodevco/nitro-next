import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2905_guardian_chat_review_accept_xml` (layout "guardian_chat_review_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewAcceptLayoutProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const GuardianChatReviewAcceptLayout = ({ itemsItemlist, layout, onClose }: GuardianChatReviewAcceptLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_accept"
            name="guardian_chat_review_accept"
            params={32769}
            caption={t('guide.bully.request.guide.accept.title')}
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
                    <Region
                        name="itemlist"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 221, flexDirection: 'column' }}
                    >
                        {itemsItemlist ?? (
                            <>
                                <GuardianChatReviewAcceptLayoutRequestTitleItem />
                                <GuardianChatReviewAcceptLayoutRequestTypeItem />
                                <GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem />
                                <GuardianChatReviewAcceptLayoutAcceptButtonItem />
                                <GuardianChatReviewAcceptLayoutSkipLinkItem />
                            </>
                        )}
                    </Region>
                </Border>
                <ThemeImage
                    params={16}
                    src={layoutImage('help_chat_review_perpetrator.png')}
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
            </Region>
        </Frame>
    );
};

/** Row template `request_title` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestTitleItemProps {
    captionRequestTitle?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestTitleItem = ({ captionRequestTitle, layout }: GuardianChatReviewAcceptLayoutRequestTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_title"
            params={16}
            layout={{ width: 170, height: 47, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestTitle ?? t('guide.bully.request.guide.accept.request.title')}
                textStyle="text-style-il-heading-2"
            />
        </Region>
    );
};

/** Row template `request_type` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestTypeItemProps {
    captionRequestType?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestTypeItem = ({ captionRequestType, layout }: GuardianChatReviewAcceptLayoutRequestTypeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_type"
            params={16}
            layout={{ width: 170, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionRequestType ?? t('guide.bully.request.guide.accept.request.type')} />
        </Region>
    );
};

/** Row template `request_description` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuardianChatReviewAcceptLayoutRequestDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_description"
            params={16}
            layout={{ width: 195, height: 38, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestDescription ?? t('guide.bully.request.guide.accept.request.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            />
        </Region>
    );
};

/** Row template `request_description_wrapper` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItemProps {
    itemsRequestDescriptionWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem = ({ itemsRequestDescriptionWrapper, layout }: GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItemProps) => {
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
                    <GuardianChatReviewAcceptLayoutRequestDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Row template `accept_button` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutAcceptButtonItemProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
}

export const GuardianChatReviewAcceptLayoutAcceptButtonItem = ({ layout, onAcceptButton }: GuardianChatReviewAcceptLayoutAcceptButtonItemProps) => {
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
            <Region
                params={8536080}
                layout={{ position: 'absolute', left: 20, width: 200, top: 11, height: 25, maxWidth: 200, flexDirection: 'row', gap: 5 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('help_accept_icon.png')}
                    layout={{ width: 11, height: 12, flexShrink: 0 }}
                />
                <Region
                    params={16}
                    layout={{ width: 247, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('guide.bully.request.guide.accept.accept.button')}
                        textStyle="text-style-il-button"
                    />
                </Region>
            </Region>
        </ContainerButton>
    );
};

/** Row template `skip_link` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutSkipLinkItemProps {
    layout?: BoxLayout;
    onSkipLink?: () => void;
}

export const GuardianChatReviewAcceptLayoutSkipLinkItem = ({ layout, onSkipLink }: GuardianChatReviewAcceptLayoutSkipLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="skip_link"
            params={17}
            onPointerTap={onSkipLink}
            cursor="pointer"
            layout={{ width: 215, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('guide.bully.request.guide.accept.skip.link')}
                    textStyle="text-style-il-link-regular"
                />
            </Region>
        </Region>
    );
};
