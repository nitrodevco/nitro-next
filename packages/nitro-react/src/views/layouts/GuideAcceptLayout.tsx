import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2907_guide_accept_xml` (layout "guide_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideAcceptLayoutProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onClose?: () => void;
    onSkipLink?: () => void;
}

export const GuideAcceptLayout = ({ layout, onAcceptButton, onClose, onSkipLink }: GuideAcceptLayoutProps) => {
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
                                text={t('guide.help.request.guide.accept.request.title')}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="request_type"
                            params={16}
                            layout={{ width: 73, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Request type" />
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
                                    layout={{ width: 195, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Help message"
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
                            {t('guide.help.request.user.pending.cancel.button')}
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
                                    layout={{ width: 244, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('guide.help.request.guide.accept.accept.button')}
                                        textStyle="text-style-il-button"
                                    />
                                </Region>
                            </Region>
                        </ContainerButton>
                        <Region
                            name="skip_link"
                            params={1}
                            layout={{ width: 212, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onSkipLink}
                            cursor="pointer"
                        >
                            <ThemeText text={t('guide.help.request.guide.accept.skip.link')} />
                        </Region>
                    </Region>
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
                    layout={{ position: 'absolute', left: -10, width: 230, top: 155, height: 140 }}
                >
                    <ThemeImage
                        name="frank_greeting"
                        params={1040}
                        src={layoutImage('help_frank_greeting.png')}
                        layout={{ position: 'absolute', left: -10, width: 230, top: 155, height: 140 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
