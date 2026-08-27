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
    visibleLinkRegion?: boolean;
}

export const QuestLayout = ({ captionCancelTxt, captionDelayDescTxt, captionDelayTxt, captionDescTxt, captionHintTxt, captionLinkCatalog, captionLinkNavigator, captionLinkRoom, captionQuestHeaderTxt, captionRewardAmountTxt, captionRewardCaptionTxt, captionTimeleftTxt, layout, onAcceptButton, onCancelRegion, onLinkRegion, srcHourglassIcon, srcQuestPicBitmap, visibleLinkRegion }: QuestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 114, ...layout }}>
            <Border
                variant="0"
                name="quest_container"
                params={16}
                tintColor="#c9c9c9"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 114 }}
            >
                <Border
                    variant="0"
                    name="quest_header"
                    params={144}
                    tintColor="#8e8e8e"
                    layout={{ position: 'absolute', left: 5, right: 6, top: 6, height: 28 }}
                >
                    <Region
                        name="quest_header_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 208, top: 5, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionQuestHeaderTxt ?? 'Frienship Quest 8/16: Share Love'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        params={409616}
                        layout={{ position: 'absolute', right: 10, top: 0, flexDirection: 'row', gap: 5 }}
                    >
                        <Region
                            name="timeleft_txt"
                            params={262160}
                            layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTimeleftTxt ?? '5 days'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <ThemeImage
                            name="hourglass_icon"
                            params={17}
                            src={srcHourglassIcon}
                            layout={{ width: 14, height: 20, flexShrink: 0 }}
                        />
                    </Region>
                </Border>
                <ButtonThick
                    variant="3"
                    name="accept_button"
                    tags={[ 'FIT:questsAcceptButton' ]}
                    params={132177}
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', right: 8, width: 108, bottom: 9, height: 29, minWidth: 108, maxWidth: 108 }}
                >
                    {t('quests.list.accept')}
                </ButtonThick>
                <Region
                    name="desc_txt"
                    params={144}
                    layout={{ position: 'absolute', left: 98, right: 9, top: 39, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    />
                </Region>
                <Region
                    name="reward_caption_txt"
                    params={1040}
                    layout={{ position: 'absolute', left: 99, width: 143, bottom: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRewardCaptionTxt ?? t('quests.list.rewardcaption')} />
                </Region>
                <Region
                    name="reward_amount_txt"
                    params={1040}
                    layout={{ position: 'absolute', left: 150, width: 23, bottom: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRewardAmountTxt ?? '200'} />
                </Region>
                <Region
                    name="cancel_region"
                    tags={[ 'FIT:questInfoCancel' ]}
                    params={132113}
                    onPointerTap={onCancelRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 271, width: 100, bottom: 15, height: 18 }}
                >
                    <Region
                        name="cancel_txt"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionCancelTxt ?? t('quests.list.reject')} />
                    </Region>
                </Region>
                <ThemeImage
                    name="quest_pic_bitmap"
                    params={16}
                    src={srcQuestPicBitmap}
                    layout={{ position: 'absolute', left: 6, width: 92, top: 38, height: 72 }}
                />
                <Icon
                    variant="0"
                    name="currency_icon"
                    params={1040}
                    layout={{ position: 'absolute', left: 169, width: 22, bottom: 12, height: 22 }}
                />
                <Region
                    name="hint_txt"
                    params={129}
                    visible={false}
                    layout={{ position: 'absolute', left: 98, right: 9, top: 72, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHintTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    />
                </Region>
                <Region
                    name="link_region"
                    params={131089}
                    visible={visibleLinkRegion ?? false}
                    onPointerTap={onLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 98, width: 155, top: 72, height: 18 }}
                >
                    <Region
                        name="link_catalog"
                        params={4194320}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLinkCatalog ?? t('quests.list.opencatalog')} />
                    </Region>
                    <Region
                        name="link_navigator"
                        params={4194320}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLinkNavigator ?? t('quests.list.opennavigator')} />
                    </Region>
                    <Region
                        name="link_room"
                        params={4194320}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLinkRoom ?? t('quests.gotocampaignroom')} />
                    </Region>
                </Region>
                <Region
                    name="delay_desc_txt"
                    params={144}
                    visible={false}
                    layout={{ position: 'absolute', left: 98, right: 9, top: 53, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionDelayDescTxt ?? t('quests.list.nextquestavailable')} />
                </Region>
                <Region
                    name="delay_txt"
                    params={144}
                    visible={false}
                    layout={{ position: 'absolute', left: 98, right: 144, top: 71, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDelayTxt ?? '7 hours'}
                        textOptions={{ fill: '#0090bd' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
