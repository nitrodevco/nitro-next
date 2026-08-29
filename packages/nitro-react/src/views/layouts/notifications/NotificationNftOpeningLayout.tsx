import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2986_notification_nft_opening_xml` (layout "notification_nft_opening", 190x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationNftOpeningLayoutProps {
    bottom?: NotificationNftOpeningLayoutBottomProps;
    captionNftPrizeDescription?: string;
    header?: NotificationNftOpeningLayoutHeaderProps;
    layout?: BoxLayout;
}

export const NotificationNftOpeningLayout = ({ bottom, captionNftPrizeDescription, header, layout }: NotificationNftOpeningLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 110, ...layout }}>
            <Border
                variant="2"
                tags={[ 'border' ]}
                tintColor="#006154"
                layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 110 }}
            >
                <NotificationNftOpeningLayoutHeader {...header} />
                <WidgetSlot
                    widgetType="product_icon"
                    name="icon_widget"
                    layout={{ position: 'absolute', left: 9, width: 40, top: 31, height: 40 }}
                />
                <Region
                    name="nft_prize_description"
                    tags={[ 'notification_text' ]}
                    layout={{ position: 'absolute', left: 65, width: 115, top: 29, height: 50, minHeight: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNftPrizeDescription ?? t('collectibles.reward_box.notif.desc')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                    />
                </Region>
                <ThemeImage
                    tags={[ 'notification_icon' ]}
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, alignSelf: 'center', height: 50 }}
                />
                <NotificationNftOpeningLayoutBottom {...bottom} />
            </Border>
        </Region>
    );
};

/** Named region `header` of NotificationNftOpeningLayout - configured through the parent's `header` prop. */
export interface NotificationNftOpeningLayoutHeaderProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NotificationNftOpeningLayoutHeader = ({ layout, tags }: NotificationNftOpeningLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#012723"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
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
    );
};

/** Named region `bottom` of NotificationNftOpeningLayout - configured through the parent's `bottom` prop. */
export interface NotificationNftOpeningLayoutBottomProps {
    layout?: BoxLayout;
    onRarityText?: () => void;
    tags?: string[];
}

export const NotificationNftOpeningLayoutBottom = ({ layout, onRarityText, tags }: NotificationNftOpeningLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 25 }}>
                <Button
                    variant="3"
                    name="rarity_text"
                    tintColor="#f5d634"
                    onPointerTap={onRarityText}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 25, minWidth: 178 }}
                >
                    {'Rarity: '}
                </Button>
            </Region>
        </Region>
    );
};
