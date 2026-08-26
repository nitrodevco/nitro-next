import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1559_club_gift_list_item_xml` (layout "marketplace_offers_item", 320x58) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftListItemLayoutProps {
    layout?: BoxLayout;
    onSelectButton?: () => void;
}

export const ClubGiftListItemLayout = ({ layout, onSelectButton }: ClubGiftListItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 320, height: 58, ...layout }}>
            <Border
                variant="0"
                params={16}
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 58 }}
            >
                <Region
                    name="gift_name"
                    params={16}
                    layout={{ position: 'absolute', left: 58, width: 71, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="lorem ipsum"
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="gift_desc"
                    params={16}
                    layout={{ position: 'absolute', left: 58, width: 60, top: 22, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="lorem ipsum"
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="months_required"
                    params={16}
                    layout={{ position: 'absolute', left: 58, width: 236, top: 36, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <Button
                    variant="3"
                    name="select_button"
                    params={393233}
                    onPointerTap={onSelectButton}
                    layout={{ position: 'absolute', left: 167, width: 148, top: 32, height: 22 }}
                >
                    {t('catalog.club_gift.select')}
                </Button>
                <Region
                    name="image_container"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 52, top: 6, height: 46 }}
                >
                    <ThemeImage
                        name="image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                    />
                    <Region
                        name="bundleCounter"
                        params={176}
                        layout={{ position: 'absolute', left: 18, width: 10, top: 18, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="0"
                            textOptions={{ fill: '#cccc66' }}
                        />
                    </Region>
                    <Border
                        variant="2"
                        name="multiContainer"
                        params={131088}
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', left: 10, width: 17, top: 2, height: 17 }}
                    >
                        <Region
                            name="multiCounter"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 10, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="0"
                                textOptions={{ fill: '#cccc66' }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Icon
                    variant="12"
                    name="vip_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                />
            </Border>
        </Region>
    );
};
