import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `page_container` of SafetyBookletLayout - configured through the parent's `pageContainer` prop. */
export interface SafetyBookletLayoutPageContainerProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    separatorWidget?: ReactNode;
    separatorWidget2?: ReactNode;
    separatorWidget3?: ReactNode;
    srcIllustration?: string;
    visiblePageContainer?: boolean;
}

export const SafetyBookletLayoutPageContainer = ({ captionDescription, captionTitle, layout, onNextButton, onPreviousButton, separatorWidget, separatorWidget2, separatorWidget3, srcIllustration, visiblePageContainer }: SafetyBookletLayoutPageContainerProps) => {
    const t = useTranslation();

    return (
        (visiblePageContainer ?? false) && (
            <Region
                name="page_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420, ...layout }}
            >
                <WidgetSlot
                    widgetType="separator"
                    options={{ 'separator:vertical': 'true' }}
                    layout={{ position: 'absolute', left: 240, width: 20, top: 50, height: 280 }}
                >
                    {separatorWidget}
                </WidgetSlot>
                <ThemeImage
                    name="illustration"
                    src={srcIllustration}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 50, height: 280 }}
                />
                <Region layout={{ position: 'absolute', left: 270, width: 210, top: 80, height: 250, flexDirection: 'column', gap: 20 }}>
                    <ThemeText
                        text={captionTitle ?? 'Title'}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                        name="title"
                        verticalAlign="top"
                        layout={{ width: 210, height: 19, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionDescription ?? 'Keep your full name, address, phone numbers, photos and school name secret so nobody can scam, bully you or place you in danger.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                        name="description"
                        verticalAlign="top"
                        layout={{ width: 210, height: 53, flexShrink: 0 }}
                    />
                </Region>
                <ContainerButton
                    variant="101"
                    name="previous_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onPreviousButton}
                    layout={{ position: 'absolute', left: 21, width: 197, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                        <ThemeImage
                            src={layoutImage('help_habboway_prev.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        >
                            {separatorWidget2}
                        </WidgetSlot>
                        <ThemeText
                            text={t('habbo.way.previous.button')}
                            textStyle="text-style-il-button"
                            layout={{ width: 140, height: 15, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="101"
                    name="next_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onNextButton}
                    layout={{ position: 'absolute', right: 19, width: 178, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                        <ThemeText
                            text={t('habbo.way.next.button')}
                            textStyle="text-style-il-button"
                            layout={{ width: 121, height: 15, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        >
                            {separatorWidget3}
                        </WidgetSlot>
                        <ThemeImage
                            src={layoutImage('help_habboway_next.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
            </Region>
        )
    );
};
