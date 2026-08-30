import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `33_next_ltd_available_xml` (layout "next_ltd_available", 541x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NextLtdAvailableLayoutProps {
    captionHeader?: string;
    colorableTextColor?: string;
    countdown?: ReactNode;
    layout?: BoxLayout;
    onCatalogueButton?: () => void;
    onGet?: () => void;
    visibleGet?: boolean;
}

export const NextLtdAvailableLayout = ({ captionHeader, colorableTextColor, countdown, layout, onCatalogueButton, onGet, visibleGet }: NextLtdAvailableLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 541, height: 60, ...layout }}>
            <Border
                variant="100"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src="${image.library.url}reception/new_limited_released.png"
                    layout={{ position: 'absolute', left: 7, width: 44, top: 8, height: 38 }}
                />
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    layout={{ position: 'absolute', left: 427, width: 99, top: 11, height: 37 }}
                >
                    {countdown}
                </WidgetSlot>
                <ThemeText
                    text={captionHeader ?? t('landing.view.next.ltd.header')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: colorableTextColor }}
                    name="header"
                    layout={{ position: 'absolute', left: 73, width: 151, top: 5, height: 16 }}
                />
                {(visibleGet ?? false) && (
                    <Button
                        variant="100"
                        name="get"
                        onPointerTap={onGet}
                        layout={{ position: 'absolute', left: 367, right: 1, top: -1, height: 46, minWidth: 125, maxWidth: 200 }}
                    >
                        {t('landing.view.next.ltd.get')}
                    </Button>
                )}
                <Region
                    name="button_container"
                    layout={{ position: 'absolute', left: 60, width: 230, top: 20, height: 38 }}
                >
                    <Button
                        variant="100"
                        name="catalogue_button"
                        onPointerTap={onCatalogueButton}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 43 }}
                    >
                        {t('landing.view.next.ltd.opencatalogue')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
