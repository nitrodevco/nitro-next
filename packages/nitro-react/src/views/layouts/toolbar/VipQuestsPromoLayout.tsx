import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1264_vip_quests_promo_xml` (layout "vip_quests_promo", 193x216) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipQuestsPromoLayoutProps {
    captionTitleTxt?: string;
    itemsContentItemlist?: ReactNode;
    layout?: BoxLayout;
    onMaximizeRegion?: () => void;
    onMinimizeRegion?: () => void;
    srcPromoImg?: string;
}

export const VipQuestsPromoLayout = ({ captionTitleTxt, itemsContentItemlist, layout, onMaximizeRegion, onMinimizeRegion, srcPromoImg }: VipQuestsPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 193, height: 216, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 216 }}
            >
                <Region
                    name="minimize_region"
                    onPointerTap={onMinimizeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('messenger_minimize_button.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="maximize_region"
                    onPointerTap={onMaximizeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('common_maximize.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="title_txt"
                    layout={{ position: 'absolute', left: 13, width: 150, top: 10, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleTxt ?? t('citizenship.vip.quests.title')}
                        textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
                <ThemeImage
                    name="promo_img"
                    src={srcPromoImg ?? '${image.library.url}talent/citizenship_vip_quest_promo.png'}
                    layout={{ position: 'absolute', right: 6, width: 92, bottom: 1, height: 97 }}
                />
                <Region
                    name="content_itemlist"
                    layout={{ position: 'absolute', left: 0, top: 30, flexDirection: 'column', gap: 5 }}
                >
                    {itemsContentItemlist ?? (
                        <>
                            <VipQuestsPromoLayoutCaptionTxtItem />
                            <VipQuestsPromoLayoutInfoTxtItem />
                            <VipQuestsPromoLayoutQuestsButtonItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `caption_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutCaptionTxtItemProps {
    captionCaptionTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutCaptionTxtItem = ({ captionCaptionTxt, layout }: VipQuestsPromoLayoutCaptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="caption_txt"
            layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCaptionTxt ?? t('citizenship.vip.quests.caption')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `info_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutInfoTxtItemProps {
    captionInfoTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutInfoTxtItem = ({ captionInfoTxt, layout }: VipQuestsPromoLayoutInfoTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_txt"
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfoTxt ?? t('citizenship.vip.quests.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `quests_button` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutQuestsButtonItemProps {
    layout?: BoxLayout;
    onQuestsButton?: () => void;
}

export const VipQuestsPromoLayoutQuestsButtonItem = ({ layout, onQuestsButton }: VipQuestsPromoLayoutQuestsButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="quests_button"
            onPointerTap={onQuestsButton}
            layout={{ width: 187, height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187, ...layout }}
        >
            {t('citizenship.vip.quests.button')}
        </Button>
    );
};
