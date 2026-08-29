import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `128_QuestCompletedDialog_xml` (layout "achievement_notification", 426x215) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestCompletedDialogLayoutProps {
    captionCongratsTxt?: string;
    captionDescTxt?: string;
    captionRewardTxt?: string;
    catalogLinkRegion?: QuestCompletedDialogLayoutCatalogLinkRegionProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onMoreQuestsButton?: () => void;
    onNextQuestButton?: () => void;
    srcCampaignPicBitmap?: string;
    srcCampaignRewardIcon?: string;
    srcRewardIcon?: string;
    srcTwinkleBitmap?: string;
}

export const QuestCompletedDialogLayout = ({ captionCongratsTxt, captionDescTxt, captionRewardTxt, catalogLinkRegion, layout, onClose, onMoreQuestsButton, onNextQuestButton, srcCampaignPicBitmap, srcCampaignRewardIcon, srcRewardIcon, srcTwinkleBitmap }: QuestCompletedDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('quests.completed.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 426, height: 215, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    backgroundColor="#7d7da6"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 95 }}
                />
                <ThemeImage
                    name="reward_icon"
                    params={16}
                    src={srcRewardIcon ?? '${image.library.questing.url}quest_doneicon.png'}
                    layout={{ position: 'absolute', left: 6, width: 125, top: 10, height: 114 }}
                />
                <ThemeImage
                    name="campaign_reward_icon"
                    params={16}
                    src={srcCampaignRewardIcon ?? '${image.library.questing.url}ach_receive_star.png'}
                    layout={{ position: 'absolute', left: 9, width: 109, top: 5, height: 109 }}
                />
                <ThemeImage
                    name="campaign_pic_bitmap"
                    params={16}
                    src={srcCampaignPicBitmap}
                    layout={{ position: 'absolute', left: 23, width: 84, top: 25, height: 72 }}
                />
                <ThemeImage
                    name="twinkle_bitmap"
                    params={16}
                    src={srcTwinkleBitmap}
                    layout={{ position: 'absolute', left: 35, width: 70, top: 30, height: 70 }}
                />
                <Region
                    name="congrats_txt"
                    params={129}
                    layout={{ position: 'absolute', left: 138, right: 5, top: 22, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCongratsTxt ?? t('quests.completed.congrats')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 283 }}
                    />
                </Region>
                <Region
                    name="desc_txt"
                    params={129}
                    layout={{ position: 'absolute', left: 139, right: 5, top: 48, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescTxt ?? 'desc_txt jhg kjh gjkhg kjh gjkh gkjh gkjh gkjh gkjhg kjhg kjh'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 282 }}
                    />
                </Region>
                <Region
                    name="reward_txt"
                    params={1153}
                    layout={{ position: 'absolute', left: 138, right: -3, bottom: 104, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRewardTxt ?? 'reward_txt'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 291 }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="next_quest_button"
                    params={132177}
                    onPointerTap={onNextQuestButton}
                    layout={{ position: 'absolute', right: 13, width: 141, bottom: 45, height: 29, minWidth: 141, maxWidth: 141 }}
                >
                    {t('quests.completed.next')}
                </ButtonThick>
                <QuestCompletedDialogLayoutCatalogLinkRegion {...catalogLinkRegion} />
                <ButtonThick
                    variant="3"
                    name="more_quests_button"
                    params={132177}
                    onPointerTap={onMoreQuestsButton}
                    layout={{ position: 'absolute', right: 134, width: 157, bottom: 45, height: 29, minWidth: 157, maxWidth: 157 }}
                >
                    {t('quests.campaigncompleted.more')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};

/** Named region `catalog_link_region` of QuestCompletedDialogLayout - configured through the parent's `catalogLinkRegion` prop. */
export interface QuestCompletedDialogLayoutCatalogLinkRegionProps {
    captionCatalogLinkTxt?: string;
    layout?: BoxLayout;
    onCatalogLinkRegion?: () => void;
}

export const QuestCompletedDialogLayoutCatalogLinkRegion = ({ captionCatalogLinkTxt, layout, onCatalogLinkRegion }: QuestCompletedDialogLayoutCatalogLinkRegionProps) => {
    return (
        <Region
            name="catalog_link_region"
            params={132113}
            onPointerTap={onCatalogLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 19, width: 91, bottom: 52, height: 18, ...layout }}
        >
            <Region
                name="catalog_link_txt"
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCatalogLinkTxt ?? 'catalog_link_txt'} />
            </Region>
        </Region>
    );
};
