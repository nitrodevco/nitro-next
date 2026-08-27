import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2910_my_reports_xml` (layout "my_reports", 538x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MyReportsLayoutProps {
    captionActionDescTxt?: string;
    captionActionTxt?: string;
    captionCreatedKeyTxt?: string;
    captionDecisionDateTxt?: string;
    captionReportedDateTxt?: string;
    captionSanctionInfoTxt?: string;
    layout?: BoxLayout;
    onAppealButton?: () => void;
    onClose?: () => void;
    visibleSpacer?: boolean;
    visibleStatusInfoBubble?: boolean;
}

export const MyReportsLayout = ({ captionActionDescTxt, captionActionTxt, captionCreatedKeyTxt, captionDecisionDateTxt, captionReportedDateTxt, captionSanctionInfoTxt, layout, onAppealButton, onClose, visibleSpacer, visibleStatusInfoBubble }: MyReportsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={165889}
            caption={t('report.status.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 538, height: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="reports_table_cont"
                    params={12585104}
                    layout={{ position: 'absolute', left: 4, width: 531, top: 3, height: 176 }}
                />
                <Region
                    visible={visibleStatusInfoBubble ?? true}
                    layout={{ position: 'absolute', left: 529, width: 292, top: -24, height: 189 }}
                >
                    <Bubble
                        variant="7"
                        name="status_info_bubble"
                        params={1}
                        pointer="left"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            params={8388624}
                            layout={{ position: 'absolute', left: 8, width: 260, top: 8, height: 158, flexDirection: 'column' }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 155, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('report.status.info.title')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="spacer"
                                params={16}
                                layout={{ width: 0, height: 8, flexShrink: 0 }}
                            />
                            <Region
                                params={16}
                                layout={{ width: 223, height: 17, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                            >
                                <Region
                                    name="created_key_txt"
                                    params={16}
                                    layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionCreatedKeyTxt ?? t('report.status.info.reported')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="reported_date_txt"
                                    params={16}
                                    layout={{ width: 63, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionReportedDateTxt ?? '18.09.2024'} />
                                </Region>
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 219, height: 17, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 154, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('report.status.info.decision')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="decision_date_txt"
                                    params={16}
                                    layout={{ width: 63, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionDecisionDateTxt ?? '18.09.2024'} />
                                </Region>
                            </Region>
                            <Region
                                name="spacer"
                                params={16}
                                layout={{ width: 0, height: 8, flexShrink: 0 }}
                            />
                            <Region
                                name="action_txt"
                                params={16}
                                layout={{ width: 143, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionActionTxt ?? t('report.status.info.action')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="action_desc_txt"
                                params={144}
                                layout={{ width: 260, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionActionDescTxt ?? t('report.status.info.auto_moderated.no_action')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                                />
                            </Region>
                            <Region
                                name="spacer"
                                params={16}
                                visible={visibleSpacer ?? false}
                                layout={{ width: 0, height: 8, flexShrink: 0 }}
                            />
                            <Region
                                name="sanction_info_txt"
                                params={129}
                                layout={{ width: 260, height: 17, flexShrink: 0, minWidth: 260, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionSanctionInfoTxt ?? 'asdasd'}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                                />
                            </Region>
                            <Region
                                name="spacer"
                                params={16}
                                layout={{ width: 0, height: 8, flexShrink: 0 }}
                            />
                            <Button
                                variant="3"
                                name="appeal_button"
                                params={131281}
                                onPointerTap={onAppealButton}
                                layout={{ width: 173, height: 30, flexShrink: 0 }}
                            >
                                {t('report.status.button.appeal')}
                            </Button>
                        </Region>
                    </Bubble>
                </Region>
            </Region>
        </Frame>
    );
};
