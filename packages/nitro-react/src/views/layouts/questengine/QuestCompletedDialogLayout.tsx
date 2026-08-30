import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `128_QuestCompletedDialog_xml` (layout "achievement_notification", 426x215) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestCompletedDialogLayoutProps {
    captionCatalogLinkTxt?: string;
    captionCongratsTxt?: string;
    captionDescTxt?: string;
    captionRewardTxt?: string;
    layout?: BoxLayout;
    onCatalogLinkRegion?: () => void;
    onClose?: () => void;
    onMoreQuestsButton?: () => void;
    onNextQuestButton?: () => void;
    srcCampaignPicBitmap?: string;
    srcCampaignRewardIcon?: string;
    srcRewardIcon?: string;
    srcTwinkleBitmap?: string;
    tintTwinkleBitmap?: string;
}

export const QuestCompletedDialogLayout = ({ captionCatalogLinkTxt, captionCongratsTxt, captionDescTxt, captionRewardTxt, layout, onCatalogLinkRegion, onClose, onMoreQuestsButton, onNextQuestButton, srcCampaignPicBitmap, srcCampaignRewardIcon, srcRewardIcon, srcTwinkleBitmap, tintTwinkleBitmap }: QuestCompletedDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('quests.completed.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 426, height: 215, minWidth: 426, minHeight: 215, ...layout }}
        >
            <Region
                backgroundColor="#7d7da6"
                layout={{ position: 'absolute', left: 1, right: -11, top: 0, bottom: 54 }}
            />
            <ThemeImage
                name="reward_icon"
                src={srcRewardIcon ?? '${image.library.questing.url}quest_doneicon.png'}
                layout={{ position: 'absolute', left: 6, width: 125, top: 10, height: 114 }}
            />
            <ThemeImage
                name="campaign_reward_icon"
                src={srcCampaignRewardIcon ?? '${image.library.questing.url}ach_receive_star.png'}
                layout={{ position: 'absolute', left: 9, width: 109, top: 5, height: 109 }}
            />
            <ThemeImage
                name="campaign_pic_bitmap"
                src={srcCampaignPicBitmap}
                layout={{ position: 'absolute', left: 23, width: 84, top: 25, height: 72 }}
            />
            <ThemeImage
                name="twinkle_bitmap"
                src={srcTwinkleBitmap}
                tint={tintTwinkleBitmap}
                layout={{ position: 'absolute', left: 35, width: 70, top: 30, height: 70 }}
            />
            <ThemeText
                text={captionCongratsTxt ?? t('quests.completed.congrats')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 283 }}
                name="congrats_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 138, right: -7, top: 22, height: 24 }}
            />
            <ThemeText
                text={captionDescTxt ?? 'desc_txt jhg kjh gjkhg kjh gjkh gkjh gkjh gkjh gkjhg kjhg kjh'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 282 }}
                name="desc_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 139, right: -7, top: 48, height: 31 }}
            />
            <ThemeText
                text={captionRewardTxt ?? 'reward_txt'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 291 }}
                name="reward_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 138, right: -15, bottom: 63, height: 37 }}
            />
            <ButtonThick
                variant="3"
                name="next_quest_button"
                onPointerTap={onNextQuestButton}
                layout={{ position: 'absolute', right: 1, width: 141, bottom: 4, height: 29, minWidth: 141, maxWidth: 141 }}
            >
                {t('quests.completed.next')}
            </ButtonThick>
            <Region
                name="catalog_link_region"
                onPointerTap={onCatalogLinkRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 19, width: 91, bottom: 11, height: 18 }}
            >
                <ThemeText
                    text={captionCatalogLinkTxt ?? 'catalog_link_txt'}
                    name="catalog_link_txt"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                />
            </Region>
            <ButtonThick
                variant="3"
                name="more_quests_button"
                onPointerTap={onMoreQuestsButton}
                layout={{ position: 'absolute', right: 122, width: 157, bottom: 4, height: 29, minWidth: 157, maxWidth: 157 }}
            >
                {t('quests.campaigncompleted.more')}
            </ButtonThick>
        </Frame>
    );
};
