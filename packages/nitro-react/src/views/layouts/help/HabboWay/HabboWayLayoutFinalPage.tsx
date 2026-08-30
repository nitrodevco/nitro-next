import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `final_page` of HabboWayLayout - configured through the parent's `finalPage` prop. */
export interface HabboWayLayoutFinalPageProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    onQuizButton?: () => void;
    separatorWidget?: ReactNode;
    separatorWidget2?: ReactNode;
    srcIllustration?: string;
    visibleFinalPage?: boolean;
}

export const HabboWayLayoutFinalPage = ({ layout, onBackButton, onQuizButton, separatorWidget, separatorWidget2, srcIllustration, visibleFinalPage }: HabboWayLayoutFinalPageProps) => {
    const t = useTranslation();

    return (
        (visibleFinalPage ?? false) && (
            <Region
                name="final_page"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 420, ...layout }}
            >
                <ThemeText
                    text={t('habbo.way.end.title')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ align: 'center' }}
                    layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19 }}
                />
                <ThemeText
                    text={t('habbo.way.end.content')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16 }}
                />
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 10, width: 480, top: 320, height: 30 }}
                >
                    {separatorWidget}
                </WidgetSlot>
                <ContainerButton
                    variant="101"
                    name="back_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onBackButton}
                    layout={{ position: 'absolute', left: 21, width: 177, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                        <ThemeImage
                            name="illustration"
                            src={srcIllustration ?? layoutImage('help_habboway_prev.png')}
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
                            text={t('habbo.way.back.button')}
                            textStyle="text-style-il-button"
                            layout={{ width: 120, height: 15, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
                <Button
                    variant="101"
                    name="quiz_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onQuizButton}
                    layout={{ position: 'absolute', right: 19, width: 162, top: 350, height: 60 }}
                >
                    {t('habbo.way.quiz.button')}
                </Button>
                <ThemeImage
                    src="${image.library.url}habboway/quiz_title.png"
                    layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                />
            </Region>
        )
    );
};
