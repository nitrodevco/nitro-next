import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1604_collectible_reward_xml` (layout "collectible_view", 424x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleRewardLayoutProps {
    captionProductName?: string;
    captionRarityText?: string;
    captionRarityTitle?: string;
    captionTitleText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOkButton?: () => void;
    srcFlagImage?: string;
    srcGradient?: string;
    srcRotatingStar?: string;
}

export const CollectibleRewardLayout = ({ captionProductName, captionRarityText, captionRarityTitle, captionTitleText, layout, onClose, onOkButton, srcFlagImage, srcGradient, srcRotatingStar }: CollectibleRewardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="CollectibleReward"
            name="CollectibleReward"
            params={1073774593}
            caption={t('collectibles.reward_box.notif.title')}
            tintColor="#5e696d"
            onClose={onClose}
            layout={{ width: 424, height: 570, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    name="background"
                    params={2192}
                    tintColor="#5e696d"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33 }}
                />
                <Region
                    name="top_container"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 350 }}
                >
                    <Region
                        name="collector_hub_background"
                        params={144}
                        layout={{ position: 'absolute', left: -2, right: -2, top: 0, height: 565 }}
                    >
                        <ThemeImage
                            name="gradient"
                            params={144}
                            src={srcGradient ?? layoutImage('collectables_score_background_gradient.png')}
                            tint="#000000"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
                        />
                        <Border
                            variant="3"
                            name="dimmer"
                            params={144}
                            tintColor="#000000"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
                        />
                    </Region>
                    <Region
                        name="text_container"
                        params={16528}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 58 }}
                    >
                        <Region
                            name="title_text"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionTitleText ?? t('collectibles.reward_box.contains')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="product_name"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 32, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionProductName ?? 'Product Name'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#f3cd03', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="product_container"
                        params={208}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -150, width: 300, top: 25, height: 300 }}
                    >
                        <ThemeImage
                            name="rotating_star"
                            params={16}
                            src={srcRotatingStar ?? layoutImage('bg_star_300x300.png')}
                            tint="#ffecac"
                            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
                        />
                        <WidgetSlot
                            widgetType="product_image"
                            name="product_image"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="bottom_container"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 348, bottom: 35 }}
                >
                    <Border
                        variant="3"
                        name="highlight"
                        params={144}
                        tintColor="#000fff"
                        blend={0.1}
                        layout={{ position: 'absolute', left: 0, right: 0, top: -2, height: 50 }}
                    />
                    <Region
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 80, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('collectibles.reward_box.info')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="ok_button"
                        params={918737}
                        onPointerTap={onOkButton}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -60, width: 120, bottom: 33, height: 30, minWidth: 120 }}
                    >
                        {t('generic.ok')}
                    </Button>
                </Region>
                <Region
                    name="rarity_container"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 300, height: 96 }}
                >
                    <ThemeImage
                        name="flag_image"
                        params={144}
                        src={srcFlagImage ?? layoutImage('collectables_reward_rarity_flag.png')}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 86 }}
                    />
                    <Region
                        name="rarity_title"
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionRarityTitle ?? t('collectibles.item.rarity')}
                            textOptions={{ fill: '#440300', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="rarity_text"
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 50, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionRarityText ?? 'RARITY'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#440300', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
