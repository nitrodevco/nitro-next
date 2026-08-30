import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2975_notification_wired_xml` (layout "notification_wired", 190x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationWiredLayoutProps {
    captionDescription?: string;
    itemsSpacing?: ReactNode;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
}

export const NotificationWiredLayout = ({ captionDescription, itemsSpacing, layout, onButton, visibleButton }: NotificationWiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 60, ...layout }}>
            <Border
                variant="2"
                tintColor="#355477"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={layoutImage('illumina_wired_bg_right.png')}
                    layout={{ position: 'absolute', left: 0, width: 240, bottom: -81, height: 160 }}
                />
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
                >
                    <Border
                        variant="2"
                        tintColor="#1e3044"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <Region
                        backgroundColor="#1e3044"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 7, width: 177, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('product.type.wired')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 31, height: 23, flexDirection: 'column' }}>
                    <ThemeText
                        text={captionDescription ?? 'Some textyy'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                        name="description"
                        verticalAlign="top"
                        layout={{ width: 174, height: 16, flexShrink: 0, minWidth: 174, maxWidth: 174, minHeight: 0 }}
                    />
                    <Region
                        name="spacing"
                        layout={{ width: 30, height: 7, flexShrink: 0, flexDirection: 'column' }}
                    >
                        {itemsSpacing}
                    </Region>
                    {(visibleButton ?? false) && (
                        <Button
                            variant="106"
                            name="button"
                            tintColor="#6e8cb7"
                            onPointerTap={onButton}
                            textStyle="text-style-il-button"
                            layout={{ width: 65, height: 25, flexShrink: 0, minHeight: 25, maxHeight: 25 }}
                        >
                            Disable
                        </Button>
                    )}
                </Region>
                <ThemeImage
                    src={undefined}
                    layout={{ position: 'absolute', left: 7, width: 50, top: 30, height: 50 }}
                />
            </Border>
        </Region>
    );
};
