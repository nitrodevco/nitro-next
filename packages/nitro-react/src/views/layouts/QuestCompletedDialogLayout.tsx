import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `128_QuestCompletedDialog_xml` (layout "achievement_notification", 426x215) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestCompletedDialogLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onMoreQuestsButton?: () => void;
    onNextQuestButton?: () => void;
}

export const QuestCompletedDialogLayout = ({ layout, onClose, onMoreQuestsButton, onNextQuestButton }: QuestCompletedDialogLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 1, width: 424, top: 0, height: 120 }}
                />
                <ThemeImage
                    name="reward_icon"
                    params={16}
                    src="${image.library.questing.url}quest_doneicon.png"
                    layout={{ position: 'absolute', left: 6, width: 125, top: 10, height: 114 }}
                />
                <ThemeImage
                    name="campaign_reward_icon"
                    params={16}
                    src="${image.library.questing.url}ach_receive_star.png"
                    layout={{ position: 'absolute', left: 9, width: 109, top: 5, height: 109 }}
                />
                <ThemeImage
                    name="campaign_pic_bitmap"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 23, width: 84, top: 25, height: 72 }}
                />
                <ThemeImage
                    name="twinkle_bitmap"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 35, width: 70, top: 30, height: 70 }}
                />
                <Region
                    name="congrats_txt"
                    params={129}
                    layout={{ position: 'absolute', left: 138, width: 283, top: 22, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('quests.completed.congrats')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 283 }}
                    />
                </Region>
                <Region
                    name="desc_txt"
                    params={129}
                    layout={{ position: 'absolute', left: 139, width: 282, top: 48, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="desc_txt jhg kjh gjkhg kjh gjkh gkjh gkjh gkjh gkjhg kjhg kjh"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 282 }}
                    />
                </Region>
                <Region
                    name="reward_txt"
                    params={1153}
                    layout={{ position: 'absolute', left: 138, width: 291, top: 74, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="reward_txt"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 291 }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="next_quest_button"
                    params={132177}
                    onPointerTap={onNextQuestButton}
                    layout={{ position: 'absolute', left: 272, width: 141, top: 141, height: 29, minWidth: 141, maxWidth: 141 }}
                >
                    {t('quests.completed.next')}
                </ButtonThick>
                <Region
                    name="catalog_link_region"
                    params={132113}
                    layout={{ position: 'absolute', left: 19, width: 91, top: 145, height: 18 }}
                >
                    <Region
                        name="catalog_link_txt"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="catalog_link_txt" />
                    </Region>
                </Region>
                <ButtonThick
                    variant="3"
                    name="more_quests_button"
                    params={132177}
                    onPointerTap={onMoreQuestsButton}
                    layout={{ position: 'absolute', left: 135, width: 157, top: 141, height: 29, minWidth: 157, maxWidth: 157 }}
                >
                    {t('quests.campaigncompleted.more')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
