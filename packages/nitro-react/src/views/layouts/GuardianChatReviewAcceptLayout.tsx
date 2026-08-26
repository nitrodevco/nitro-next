import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2905_guardian_chat_review_accept_xml` (layout "guardian_chat_review_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewAcceptLayoutProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onClose?: () => void;
}

export const GuardianChatReviewAcceptLayout = ({ layout, onAcceptButton, onClose }: GuardianChatReviewAcceptLayoutProps) => {
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
                        <Region
                            name="request_title"
                            params={16}
                            layout={{ width: 170, height: 47, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.bully.request.guide.accept.request.title')}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="request_type"
                            params={16}
                            layout={{ width: 170, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('guide.bully.request.guide.accept.request.type')} />
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ width: 205, height: 80, flexShrink: 0 }}
                        >
                            <Region
                                name="request_description_wrapper"
                                params={16}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                <Region
                                    name="request_description"
                                    params={16}
                                    layout={{ width: 195, height: 38, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('guide.bully.request.guide.accept.request.description')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
                                    />
                                </Region>
                            </Region>
                        </ScrollArea>
                        <ContainerButton
                            variant="101"
                            name="accept_button"
                            params={180241}
                            tintColor="#bbbbbb"
                            onPointerTap={onAcceptButton}
                            layout={{ width: 200, height: 48, flexShrink: 0, maxWidth: 200, minHeight: 48, maxHeight: 48 }}
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
                        <Region
                            name="skip_link"
                            params={17}
                            layout={{ width: 215, height: 30, flexShrink: 0 }}
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
