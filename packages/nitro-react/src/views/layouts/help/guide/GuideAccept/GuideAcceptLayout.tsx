import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GuideAcceptLayoutItemlist, GuideAcceptLayoutItemlistProps } from './GuideAcceptLayoutItemlist';

/** Generated from `2907_guide_accept_xml` (layout "guide_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideAcceptLayoutProps {
    countdown?: ReactNode;
    itemlist?: GuideAcceptLayoutItemlistProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcFrankGreeting?: string;
    visibleFrankGreeting?: boolean;
}

export const GuideAcceptLayout = ({ countdown, itemlist, layout, onClose, srcFrankGreeting, visibleFrankGreeting }: GuideAcceptLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_accept"
            name="guide_accept"
            caption={t('guide.help.request.guide.accept.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 282, height: 276, minWidth: 282, maxWidth: 282, minHeight: 0, ...layout }}
        >
            <Border
                variant="103"
                name="border"
                layout={{ position: 'absolute', left: 0, width: 280, top: 20, height: 224 }}
            >
                <GuideAcceptLayoutItemlist {...itemlist} />
            </Border>
            <ThemeImage
                src={layoutImage('help_guide_accept.png')}
                layout={{ position: 'absolute', left: 0, width: 70, top: 20, height: 80 }}
            />
            <Border
                variant="102"
                layout={{ position: 'absolute', left: 185, width: 80, top: 0, height: 50 }}
            >
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    options={{ 'countdown:digits': '2' }}
                    layout={{ position: 'absolute', left: 10, width: 63, top: 10, height: 37 }}
                >
                    {countdown}
                </WidgetSlot>
            </Border>
            {(visibleFrankGreeting ?? false) && (
                <ThemeImage
                    name="frank_greeting"
                    src={srcFrankGreeting ?? layoutImage('help_frank_greeting.png')}
                    layout={{ position: 'absolute', left: -10, width: 230, bottom: -60, height: 140 }}
                />
            )}
        </Frame>
    );
};
