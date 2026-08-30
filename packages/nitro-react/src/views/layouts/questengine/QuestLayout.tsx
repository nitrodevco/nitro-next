import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `112_Quest_xml` (layout "Quest", 362x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestLayoutProps {
    captionCancelTxt?: string;
    captionDelayDescTxt?: string;
    captionDelayTxt?: string;
    captionDescTxt?: string;
    captionHintTxt?: string;
    captionLinkCatalog?: string;
    captionLinkNavigator?: string;
    captionLinkRoom?: string;
    captionQuestHeaderTxt?: string;
    captionRewardAmountTxt?: string;
    captionRewardCaptionTxt?: string;
    captionTimeleftTxt?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelRegion?: () => void;
    onLinkRegion?: () => void;
    srcHourglassIcon?: string;
    srcQuestPicBitmap?: string;
    tintHourglassIcon?: string;
    visibleDelayDescTxt?: boolean;
    visibleDelayTxt?: boolean;
    visibleHintTxt?: boolean;
    visibleLinkCatalog?: boolean;
    visibleLinkNavigator?: boolean;
    visibleLinkRegion?: boolean;
    visibleLinkRoom?: boolean;
}

export const QuestLayout = ({ captionCancelTxt, captionDelayDescTxt, captionDelayTxt, captionDescTxt, captionHintTxt, captionLinkCatalog, captionLinkNavigator, captionLinkRoom, captionQuestHeaderTxt, captionRewardAmountTxt, captionRewardCaptionTxt, captionTimeleftTxt, layout, onAcceptButton, onCancelRegion, onLinkRegion, srcHourglassIcon, srcQuestPicBitmap, tintHourglassIcon, visibleDelayDescTxt, visibleDelayTxt, visibleHintTxt, visibleLinkCatalog, visibleLinkNavigator, visibleLinkRegion, visibleLinkRoom }: QuestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 114, ...layout }}>
            <Border
                variant="0"
                name="quest_container"
                tintColor="#c9c9c9"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="0"
                    name="quest_header"
                    tintColor="#8e8e8e"
                    layout={{ position: 'absolute', left: 5, right: 6, top: 6, height: 28 }}
                >
                    <ThemeText
                        text={captionQuestHeaderTxt ?? 'Frienship Quest 8/16: Share Love'}
                        textOptions={{ fill: '#ffffff' }}
                        name="quest_header_txt"
                        layout={{ position: 'absolute', left: 20, width: 208, top: 5, height: 18 }}
                    />
                    <Region layout={{ position: 'absolute', right: 10, top: 0, flexDirection: 'row', gap: 5 }}>
                        <ThemeText
                            text={captionTimeleftTxt ?? '5 days'}
                            textOptions={{ fill: '#ffffff' }}
                            name="timeleft_txt"
                            layout={{ width: 37, height: 17, flexShrink: 0 }}
                        />
                        <ThemeImage
                            name="hourglass_icon"
                            src={srcHourglassIcon}
                            tint={tintHourglassIcon}
                            layout={{ width: 14, height: 20, flexShrink: 0 }}
                        />
                    </Region>
                </Border>
                <ButtonThick
                    variant="3"
                    name="accept_button"
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', right: 8, width: 108, bottom: 9, height: 29, minWidth: 108, maxWidth: 108 }}
                >
                    {t('quests.list.accept')}
                </ButtonThick>
                <ThemeText
                    text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    name="desc_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 98, right: 9, top: 39, height: 33 }}
                />
                <ThemeText
                    text={captionRewardCaptionTxt ?? t('quests.list.rewardcaption')}
                    name="reward_caption_txt"
                    layout={{ position: 'absolute', left: 99, width: 143, bottom: 15, height: 17 }}
                />
                <ThemeText
                    text={captionRewardAmountTxt ?? '200'}
                    name="reward_amount_txt"
                    layout={{ position: 'absolute', left: 150, width: 23, bottom: 15, height: 17 }}
                />
                <Region
                    name="cancel_region"
                    onPointerTap={onCancelRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 271, width: 100, bottom: 15, height: 18 }}
                >
                    <ThemeText
                        text={captionCancelTxt ?? t('quests.list.reject')}
                        name="cancel_txt"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                    />
                </Region>
                <ThemeImage
                    name="quest_pic_bitmap"
                    src={srcQuestPicBitmap}
                    layout={{ position: 'absolute', left: 6, width: 92, top: 38, height: 72 }}
                />
                <Icon
                    variant="0"
                    name="currency_icon"
                    layout={{ position: 'absolute', left: 169, width: 22, bottom: 12, height: 22 }}
                />
                {(visibleHintTxt ?? false) && (
                    <ThemeText
                        text={captionHintTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                        name="hint_txt"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 98, right: 9, top: 72, height: 33 }}
                    />
                )}
                {(visibleLinkRegion ?? false) && (
                    <Region
                        name="link_region"
                        onPointerTap={onLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 98, width: 155, top: 72, height: 18 }}
                    >
                        {(visibleLinkCatalog ?? false) && (
                            <ThemeText
                                text={captionLinkCatalog ?? t('quests.list.opencatalog')}
                                name="link_catalog"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                            />
                        )}
                        {(visibleLinkNavigator ?? false) && (
                            <ThemeText
                                text={captionLinkNavigator ?? t('quests.list.opennavigator')}
                                name="link_navigator"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                            />
                        )}
                        {(visibleLinkRoom ?? false) && (
                            <ThemeText
                                text={captionLinkRoom ?? t('quests.gotocampaignroom')}
                                name="link_room"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                            />
                        )}
                    </Region>
                )}
                {(visibleDelayDescTxt ?? false) && (
                    <ThemeText
                        text={captionDelayDescTxt ?? t('quests.list.nextquestavailable')}
                        name="delay_desc_txt"
                        layout={{ position: 'absolute', left: 98, right: 9, top: 53, height: 20 }}
                    />
                )}
                {(visibleDelayTxt ?? false) && (
                    <ThemeText
                        text={captionDelayTxt ?? '7 hours'}
                        textOptions={{ fill: '#0090bd' }}
                        name="delay_txt"
                        layout={{ position: 'absolute', left: 98, right: 144, top: 71, height: 20 }}
                    />
                )}
            </Border>
        </Region>
    );
};
