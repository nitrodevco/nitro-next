import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1559_club_gift_list_item_xml` (layout "marketplace_offers_item", 320x58) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftListItemLayoutProps {
    captionBundleCounter?: string;
    captionGiftDesc?: string;
    captionGiftName?: string;
    captionMonthsRequired?: string;
    captionMultiCounter?: string;
    layout?: BoxLayout;
    onSelectButton?: () => void;
    srcImage?: string;
    tintImage?: string;
}

export const ClubGiftListItemLayout = ({ captionBundleCounter, captionGiftDesc, captionGiftName, captionMonthsRequired, captionMultiCounter, layout, onSelectButton, srcImage, tintImage }: ClubGiftListItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 320, height: 58, ...layout }}>
            <Border
                variant="0"
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionGiftName ?? 'lorem ipsum'}
                    textStyle="text-style-u-bold"
                    name="gift_name"
                    layout={{ position: 'absolute', left: 58, width: 71, top: 8, height: 17 }}
                />
                <ThemeText
                    text={captionGiftDesc ?? 'lorem ipsum'}
                    textStyle="text-style-u-small"
                    name="gift_desc"
                    layout={{ position: 'absolute', left: 58, width: 60, top: 22, height: 15 }}
                />
                <ThemeText
                    text={captionMonthsRequired ?? ''}
                    textStyle="text-style-u-small"
                    name="months_required"
                    layout={{ position: 'absolute', left: 58, width: 236, top: 36, height: 15 }}
                />
                <Button
                    variant="3"
                    name="select_button"
                    onPointerTap={onSelectButton}
                    layout={{ position: 'absolute', right: 5, width: 148, top: 32, height: 22 }}
                >
                    {t('catalog.club_gift.select')}
                </Button>
                <Region
                    name="image_container"
                    layout={{ position: 'absolute', left: 7, width: 52, top: 6, height: 46 }}
                >
                    <ThemeImage
                        name="image"
                        src={srcImage}
                        tint={tintImage}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                    />
                    <ThemeText
                        text={captionBundleCounter ?? '0'}
                        textOptions={{ fill: '#cccc66' }}
                        name="bundleCounter"
                        layout={{ position: 'absolute', left: 18, right: 24, top: 18, height: 15 }}
                    />
                    <Border
                        variant="2"
                        name="multiContainer"
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', left: 10, width: 17, top: 2, height: 17 }}
                    >
                        <ThemeText
                            text={captionMultiCounter ?? '0'}
                            textOptions={{ fill: '#cccc66' }}
                            name="multiCounter"
                            layout={{ position: 'absolute', left: 3, width: 10, top: 0, height: 16 }}
                        />
                    </Border>
                </Region>
                <Icon
                    variant="12"
                    name="vip_icon"
                    layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                />
            </Border>
        </Region>
    );
};
