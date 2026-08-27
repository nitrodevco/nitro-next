import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `108_Quests_xml` (layout "Quests", 512x448) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestsLayoutProps {
    captionHcInfoText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onGetHcBtn?: () => void;
}

export const QuestsLayout = ({ captionHcInfoText, layout, onClose, onGetHcBtn }: QuestsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="quest_main_window"
            name="quest_main_window"
            params={32769}
            caption={t('quests.list.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 512, height: 448, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 10, width: 473, top: 7, height: 362 }}
                >
                    <Region
                        name="quest_list"
                        params={2177}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                {/* <scrollbar_vertical> for quest_list - rendered by that list's ScrollArea */}
                <Region
                    name="hc_info_cont"
                    params={1040}
                    layout={{ position: 'absolute', left: 7, width: 493, top: 370, height: 36 }}
                >
                    <Region
                        name="hc_info_text"
                        params={3145744}
                        layout={{ position: 'absolute', left: 7, width: 349, top: 13, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHcInfoText ?? 'You get double duckets as you are an HC member!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 349 }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="get_hc_btn"
                        params={393297}
                        tintColor="#01a101"
                        onPointerTap={onGetHcBtn}
                        layout={{ position: 'absolute', left: 368, width: 107, top: 5, height: 30 }}
                    >
                        {t('generic.get_hc')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
