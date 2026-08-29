import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleRewardLayoutTopContainer, CollectibleRewardLayoutTopContainerProps } from './CollectibleRewardLayoutTopContainer';

/** Generated from `1604_collectible_reward_xml` (layout "collectible_view", 424x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleRewardLayoutProps {
    captionRarityText?: string;
    captionRarityTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOkButton?: () => void;
    srcFlagImage?: string;
    topContainer?: CollectibleRewardLayoutTopContainerProps;
}

export const CollectibleRewardLayout = ({ captionRarityText, captionRarityTitle, layout, onClose, onOkButton, srcFlagImage, topContainer }: CollectibleRewardLayoutProps) => {
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
            <Border
                variant="3"
                name="background"
                tintColor="#5e696d"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33 }}
            />
            <CollectibleRewardLayoutTopContainer {...topContainer} />
            <Region
                name="bottom_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 348, bottom: 35, justifyContent: 'center' }}
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
            <Region
                name="rarity_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 300, height: 96 }}
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
        </Frame>
    );
};
