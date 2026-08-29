import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1604_collectible_reward_xml` (layout "collectible_view", 424x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleRewardLayoutProps {
    bottomContainer?: CollectibleRewardLayoutBottomContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    rarityContainer?: CollectibleRewardLayoutRarityContainerProps;
    topContainer?: CollectibleRewardLayoutTopContainerProps;
}

export const CollectibleRewardLayout = ({ bottomContainer, layout, onClose, rarityContainer, topContainer }: CollectibleRewardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="CollectibleReward"
            name="CollectibleReward"
            caption={t('collectibles.reward_box.notif.title')}
            tintColor="#5e696d"
            onClose={onClose}
            layout={{ width: 424, height: 570, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    name="background"
                    tintColor="#5e696d"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33 }}
                />
                <CollectibleRewardLayoutTopContainer {...topContainer} />
                <CollectibleRewardLayoutBottomContainer {...bottomContainer} />
                <CollectibleRewardLayoutRarityContainer {...rarityContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `collector_hub_background` of CollectibleRewardLayout - configured through the parent's `collectorHubBackground` prop. */
export interface CollectibleRewardLayoutCollectorHubBackgroundProps {
    layout?: BoxLayout;
    srcGradient?: string;
}

export const CollectibleRewardLayoutCollectorHubBackground = ({ layout, srcGradient }: CollectibleRewardLayoutCollectorHubBackgroundProps) => {
    return (
        <Region
            name="collector_hub_background"
            layout={{ position: 'absolute', left: -2, right: -2, top: 0, height: 565, ...layout }}
        >
            <ThemeImage
                name="gradient"
                src={srcGradient ?? layoutImage('collectables_score_background_gradient.png')}
                tint="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
            />
            <Border
                variant="3"
                name="dimmer"
                tintColor="#000000"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
            />
        </Region>
    );
};

/** Named region `text_container` of CollectibleRewardLayout - configured through the parent's `textContainer` prop. */
export interface CollectibleRewardLayoutTextContainerProps {
    captionProductName?: string;
    captionTitleText?: string;
    layout?: BoxLayout;
}

export const CollectibleRewardLayoutTextContainer = ({ captionProductName, captionTitleText, layout }: CollectibleRewardLayoutTextContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="text_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 58, ...layout }}
        >
            <Region
                name="title_text"
                layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTitleText ?? t('collectibles.reward_box.contains')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="product_name"
                layout={{ position: 'absolute', left: 0, right: 0, top: 32, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProductName ?? 'Product Name'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#f3cd03', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `product_container` of CollectibleRewardLayout - configured through the parent's `productContainer` prop. */
export interface CollectibleRewardLayoutProductContainerProps {
    layout?: BoxLayout;
    srcRotatingStar?: string;
}

export const CollectibleRewardLayoutProductContainer = ({ layout, srcRotatingStar }: CollectibleRewardLayoutProductContainerProps) => {
    return (
        <Region
            name="product_container"
            layout={{ position: 'absolute', width: 300, top: 25, height: 300, ...layout }}
        >
            <ThemeImage
                name="rotating_star"
                src={srcRotatingStar ?? layoutImage('bg_star_300x300.png')}
                tint="#ffecac"
                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
            />
            <WidgetSlot
                widgetType="product_image"
                name="product_image"
                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
            />
        </Region>
    );
};

/** Named region `top_container` of CollectibleRewardLayout - configured through the parent's `topContainer` prop. */
export interface CollectibleRewardLayoutTopContainerProps {
    collectorHubBackground?: CollectibleRewardLayoutCollectorHubBackgroundProps;
    layout?: BoxLayout;
    productContainer?: CollectibleRewardLayoutProductContainerProps;
    textContainer?: CollectibleRewardLayoutTextContainerProps;
}

export const CollectibleRewardLayoutTopContainer = ({ collectorHubBackground, layout, productContainer, textContainer }: CollectibleRewardLayoutTopContainerProps) => {
    return (
        <Region
            name="top_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 350, justifyContent: 'center', ...layout }}
        >
            <CollectibleRewardLayoutCollectorHubBackground {...collectorHubBackground} />
            <CollectibleRewardLayoutTextContainer {...textContainer} />
            <CollectibleRewardLayoutProductContainer {...productContainer} />
        </Region>
    );
};

/** Named region `bottom_container` of CollectibleRewardLayout - configured through the parent's `bottomContainer` prop. */
export interface CollectibleRewardLayoutBottomContainerProps {
    layout?: BoxLayout;
    onOkButton?: () => void;
}

export const CollectibleRewardLayoutBottomContainer = ({ layout, onOkButton }: CollectibleRewardLayoutBottomContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bottom_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 348, bottom: 35, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="3"
                name="highlight"
                tintColor="#000fff"
                blend={0.1}
                layout={{ position: 'absolute', left: 0, right: 0, top: -2, height: 50 }}
            />
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 80, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('collectibles.reward_box.info')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Button
                variant="3"
                name="ok_button"
                onPointerTap={onOkButton}
                layout={{ position: 'absolute', width: 120, bottom: 33, height: 30, minWidth: 120 }}
            >
                {t('generic.ok')}
            </Button>
        </Region>
    );
};

/** Named region `rarity_container` of CollectibleRewardLayout - configured through the parent's `rarityContainer` prop. */
export interface CollectibleRewardLayoutRarityContainerProps {
    captionRarityText?: string;
    captionRarityTitle?: string;
    layout?: BoxLayout;
    srcFlagImage?: string;
}

export const CollectibleRewardLayoutRarityContainer = ({ captionRarityText, captionRarityTitle, layout, srcFlagImage }: CollectibleRewardLayoutRarityContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarity_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 300, height: 96, ...layout }}
        >
            <ThemeImage
                name="flag_image"
                src={srcFlagImage ?? layoutImage('collectables_reward_rarity_flag.png')}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 86 }}
            />
            <Region
                name="rarity_title"
                layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionRarityTitle ?? t('collectibles.item.rarity')}
                    textOptions={{ fill: '#440300', align: 'center' }}
                />
            </Region>
            <Region
                name="rarity_text"
                layout={{ position: 'absolute', left: 0, right: 0, top: 50, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionRarityText ?? 'RARITY'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#440300', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
