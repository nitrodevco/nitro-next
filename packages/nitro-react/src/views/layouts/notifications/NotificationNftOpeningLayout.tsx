import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2986_notification_nft_opening_xml` (layout "notification_nft_opening", 190x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationNftOpeningLayoutProps {
    captionNftPrizeDescription?: string;
    layout?: BoxLayout;
    onRarityText?: () => void;
}

export const NotificationNftOpeningLayout = ({ captionNftPrizeDescription, layout, onRarityText }: NotificationNftOpeningLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 110, ...layout }}>
            <Border
                variant="2"
                tags={[ 'border' ]}
                params={1}
                tintColor="#006154"
                layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 110 }}
            >
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
                >
                    <Border
                        variant="2"
                        params={144}
                        tintColor="#012723"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
                    />
                    <Region
                        params={144}
                        backgroundColor="#012723"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 10 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 194, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('collectibles.reward_box.notif.title')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="product_icon"
                    name="icon_widget"
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 40, top: 31, height: 40 }}
                />
                <Region
                    name="nft_prize_description"
                    tags={[ 'notification_text' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 65, width: 115, top: 29, height: 50, minHeight: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNftPrizeDescription ?? t('collectibles.reward_box.notif.desc')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                    />
                </Region>
                <ThemeImage
                    tags={[ 'notification_icon' ]}
                    params={3088}
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, top: '50%', marginTop: -25, height: 50 }}
                />
                <Region
                    name="bottom"
                    params={1168}
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                >
                    <Region
                        params={144}
                        layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 25 }}
                    >
                        <Button
                            variant="3"
                            name="rarity_text"
                            params={131217}
                            tintColor="#f5d634"
                            onPointerTap={onRarityText}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 25, minWidth: 178 }}
                        >
                            {'Rarity: '}
                        </Button>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
