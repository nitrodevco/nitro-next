import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1264_vip_quests_promo_xml` (layout "vip_quests_promo", 193x216) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipQuestsPromoLayoutProps {
    layout?: BoxLayout;
    onQuestsButton?: () => void;
}

export const VipQuestsPromoLayout = ({ layout, onQuestsButton }: VipQuestsPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 193, height: 216, ...layout }}>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 216 }}
            >
                <Region
                    name="minimize_region"
                    params={17}
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('messenger_minimize_button.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="maximize_region"
                    params={17}
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('common_maximize.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="title_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 13, width: 150, top: 10, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('citizenship.vip.quests.title')}
                        textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
                <ThemeImage
                    name="promo_img"
                    params={1310736}
                    src="${image.library.url}talent/citizenship_vip_quest_promo.png"
                    layout={{ position: 'absolute', left: 95, width: 92, top: 118, height: 97 }}
                />
                <Region
                    name="content_itemlist"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 188, top: 30, height: 105, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('citizenship.vip.quests.caption')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        params={16}
                        layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('citizenship.vip.quests.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="quests_button"
                        params={131089}
                        onPointerTap={onQuestsButton}
                        layout={{ width: 187, height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187 }}
                    >
                        {t('citizenship.vip.quests.button')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
