import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `112_Quest_xml` (layout "Quest", 362x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestLayoutProps {
    cancelRegion?: QuestLayoutCancelRegionProps;
    captionDelayDescTxt?: string;
    captionDelayTxt?: string;
    captionDescTxt?: string;
    captionHintTxt?: string;
    captionQuestHeaderTxt?: string;
    captionRewardAmountTxt?: string;
    captionRewardCaptionTxt?: string;
    captionTimeleftTxt?: string;
    layout?: BoxLayout;
    linkRegion?: QuestLayoutLinkRegionProps;
    onAcceptButton?: () => void;
    srcHourglassIcon?: string;
    srcQuestPicBitmap?: string;
}

export const QuestLayout = ({ cancelRegion, captionDelayDescTxt, captionDelayTxt, captionDescTxt, captionHintTxt, captionQuestHeaderTxt, captionRewardAmountTxt, captionRewardCaptionTxt, captionTimeleftTxt, layout, linkRegion, onAcceptButton, srcHourglassIcon, srcQuestPicBitmap }: QuestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 114, ...layout }}>
            <Border
                variant="0"
                name="quest_container"
                tintColor="#c9c9c9"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 114 }}
            >
                <Border
                    variant="0"
                    name="quest_header"
                    tintColor="#8e8e8e"
                    layout={{ position: 'absolute', left: 5, right: 6, top: 6, height: 28 }}
                >
                    <Region
                        name="quest_header_txt"
                        layout={{ position: 'absolute', left: 20, width: 208, top: 5, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionQuestHeaderTxt ?? 'Frienship Quest 8/16: Share Love'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', right: 10, top: 0, flexDirection: 'row', gap: 5 }}>
                        <Region
                            name="timeleft_txt"
                            layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTimeleftTxt ?? '5 days'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <ThemeImage
                            name="hourglass_icon"
                            src={srcHourglassIcon}
                            layout={{ width: 14, height: 20, flexShrink: 0 }}
                        />
                    </Region>
                </Border>
                <ButtonThick
                    variant="3"
                    name="accept_button"
                    tags={[ 'FIT:questsAcceptButton' ]}
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', right: 8, width: 108, bottom: 9, height: 29, minWidth: 108, maxWidth: 108 }}
                >
                    {t('quests.list.accept')}
                </ButtonThick>
                <Region
                    name="desc_txt"
                    layout={{ position: 'absolute', left: 98, right: 9, top: 39, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    />
                </Region>
                <Region
                    name="reward_caption_txt"
                    layout={{ position: 'absolute', left: 99, width: 143, bottom: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRewardCaptionTxt ?? t('quests.list.rewardcaption')} />
                </Region>
                <Region
                    name="reward_amount_txt"
                    layout={{ position: 'absolute', left: 150, width: 23, bottom: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRewardAmountTxt ?? '200'} />
                </Region>
                <QuestLayoutCancelRegion
                    tags={[ 'FIT:questInfoCancel' ]}
                    {...cancelRegion}
                />
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
                <Region
                    name="hint_txt"
                    visible={false}
                    layout={{ position: 'absolute', left: 98, right: 9, top: 72, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHintTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    />
                </Region>
                <QuestLayoutLinkRegion {...linkRegion} />
                <Region
                    name="delay_desc_txt"
                    visible={false}
                    layout={{ position: 'absolute', left: 98, right: 9, top: 53, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionDelayDescTxt ?? t('quests.list.nextquestavailable')} />
                </Region>
                <Region
                    name="delay_txt"
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

/** Named region `cancel_region` of QuestLayout - configured through the parent's `cancelRegion` prop. */
export interface QuestLayoutCancelRegionProps {
    captionCancelTxt?: string;
    layout?: BoxLayout;
    onCancelRegion?: () => void;
    tags?: string[];
}

export const QuestLayoutCancelRegion = ({ captionCancelTxt, layout, onCancelRegion, tags }: QuestLayoutCancelRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_region"
            tags={tags}
            onPointerTap={onCancelRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 271, width: 100, bottom: 15, height: 18, ...layout }}
        >
            <Region
                name="cancel_txt"
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCancelTxt ?? t('quests.list.reject')} />
            </Region>
        </Region>
    );
};

/** Named region `link_region` of QuestLayout - configured through the parent's `linkRegion` prop. */
export interface QuestLayoutLinkRegionProps {
    captionLinkCatalog?: string;
    captionLinkNavigator?: string;
    captionLinkRoom?: string;
    layout?: BoxLayout;
    onLinkRegion?: () => void;
    tags?: string[];
    visibleLinkRegion?: boolean;
}

export const QuestLayoutLinkRegion = ({ captionLinkCatalog, captionLinkNavigator, captionLinkRoom, layout, onLinkRegion, tags, visibleLinkRegion }: QuestLayoutLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="link_region"
            tags={tags}
            visible={visibleLinkRegion ?? false}
            onPointerTap={onLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 98, width: 155, top: 72, height: 18, ...layout }}
        >
            <Region
                name="link_catalog"
                visible={false}
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLinkCatalog ?? t('quests.list.opencatalog')} />
            </Region>
            <Region
                name="link_navigator"
                visible={false}
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLinkNavigator ?? t('quests.list.opennavigator')} />
            </Region>
            <Region
                name="link_room"
                visible={false}
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLinkRoom ?? t('quests.gotocampaignroom')} />
            </Region>
        </Region>
    );
};
