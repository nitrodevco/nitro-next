import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2986_notification_nft_opening_xml` (layout "notification_nft_opening", 190x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationNftOpeningLayoutProps {
    captionNftPrizeDescription?: string;
    iconWidget?: ReactNode;
    layout?: BoxLayout;
    onRarityText?: () => void;
}

export const NotificationNftOpeningLayout = ({ captionNftPrizeDescription, iconWidget, layout, onRarityText }: NotificationNftOpeningLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 110, ...layout }}>
            <Border
                variant="2"
                tintColor="#006154"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
                >
                    <Border
                        variant="2"
                        tintColor="#012723"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <Region
                        backgroundColor="#012723"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 7, width: 194, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('collectibles.reward_box.notif.title')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="product_icon"
                    name="icon_widget"
                    layout={{ position: 'absolute', left: 9, width: 40, top: 31, height: 40 }}
                >
                    {iconWidget}
                </WidgetSlot>
                <Region
                    name="nft_prize_description"
                    layout={{ position: 'absolute', left: 65, width: 115, top: 29, height: 50, minHeight: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNftPrizeDescription ?? t('collectibles.reward_box.notif.desc')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                    />
                </Region>
                <ThemeImage
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, alignSelf: 'center', height: 50 }}
                />
                <Region
                    name="bottom"
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                >
                    <Region layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 25 }}>
                        <Button
                            variant="3"
                            name="rarity_text"
                            tintColor="#f5d634"
                            onPointerTap={onRarityText}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 178 }}
                        >
                            {'Rarity: '}
                        </Button>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
