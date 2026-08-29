import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `108_Quests_xml` (layout "Quests", 512x448) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestsLayoutProps {
    hcInfoCont?: QuestsLayoutHcInfoContProps;
    layout?: BoxLayout;
    onClose?: () => void;
    questList?: QuestsLayoutQuestListProps;
}

export const QuestsLayout = ({ hcInfoCont, layout, onClose, questList }: QuestsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="quest_main_window"
            name="quest_main_window"
            caption={t('quests.list.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 512, height: 448, ...layout }}
        >
            <QuestsLayoutQuestList {...questList} />
            {/* <scrollbar_vertical> for quest_list - rendered by that list's ScrollArea */}
            <QuestsLayoutHcInfoCont {...hcInfoCont} />
        </Frame>
    );
};

/** Named region `quest_list` of QuestsLayout - configured through the parent's `questList` prop. */
export interface QuestsLayoutQuestListProps {
    layout?: BoxLayout;
}

export const QuestsLayoutQuestList = ({ layout }: QuestsLayoutQuestListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, right: 29, top: 7, bottom: 79, ...layout }}
        >
            <Region
                name="quest_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `hc_info_cont` of QuestsLayout - configured through the parent's `hcInfoCont` prop. */
export interface QuestsLayoutHcInfoContProps {
    captionHcInfoText?: string;
    layout?: BoxLayout;
    onGetHcBtn?: () => void;
}

export const QuestsLayoutHcInfoCont = ({ captionHcInfoText, layout, onGetHcBtn }: QuestsLayoutHcInfoContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hc_info_cont"
            layout={{ position: 'absolute', left: 7, width: 493, bottom: 42, height: 36, ...layout }}
        >
            <Region
                name="hc_info_text"
                layout={{ position: 'absolute', left: 7, width: 349, alignSelf: 'center', marginTop: 3.5, marginBottom: -3.5, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHcInfoText ?? 'You get double duckets as you are an HC member!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 349 }}
                />
            </Region>
            <ButtonThick
                variant="5"
                name="get_hc_btn"
                tintColor="#01a101"
                onPointerTap={onGetHcBtn}
                layout={{ position: 'absolute', right: 18, width: 107, top: 5, height: 30 }}
            >
                {t('generic.get_hc')}
            </ButtonThick>
        </Region>
    );
};
