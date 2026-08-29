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
            caption={t('report.status.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 538, height: 220, ...layout }}
        >
            <Region
                name="reports_table_cont"
                layout={{ position: 'absolute', left: 4, right: 3, top: 3, bottom: 41 }}
            />
            {(visibleStatusInfoBubble ?? true) && (
                <Bubble
                    variant="7"
                    name="status_info_bubble"
                    pointer="left"
                    layout={{ position: 'absolute', left: 529, width: 292, top: -24, height: 189 }}
                >
                    <Region layout={{ position: 'absolute', left: 8, width: 260, top: 8, height: 158, flexDirection: 'column' }}>
                        <Region layout={{ width: 155, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('report.status.info.title')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="spacer"
                            layout={{ width: 0, height: 8, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 223, height: 17, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                            <Region
                                name="created_key_txt"
                                layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCreatedKeyTxt ?? t('report.status.info.reported')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="reported_date_txt"
                                layout={{ width: 63, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionReportedDateTxt ?? '18.09.2024'} />
                            </Region>
                        </Region>
                        <Region layout={{ width: 219, height: 17, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                            <Region layout={{ width: 154, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('report.status.info.decision')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="decision_date_txt"
                                layout={{ width: 63, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionDecisionDateTxt ?? '18.09.2024'} />
                            </Region>
                        </Region>
                        <Region
                            name="spacer"
                            layout={{ width: 0, height: 8, flexShrink: 0 }}
                        />
                        <Region
                            name="action_txt"
                            layout={{ width: 143, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionActionTxt ?? t('report.status.info.action')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="action_desc_txt"
                            layout={{ width: 260, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionActionDescTxt ?? t('report.status.info.auto_moderated.no_action')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                            />
                        </Region>
                        {(visibleSpacer ?? false) && (
                            <Region
                                name="spacer"
                                layout={{ width: 0, height: 8, flexShrink: 0 }}
                            />
                        )}
                        <Region
                            name="sanction_info_txt"
                            layout={{ width: 260, height: 17, flexShrink: 0, minWidth: 260, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSanctionInfoTxt ?? 'asdasd'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                            />
                        </Region>
                        <Region
                            name="spacer"
                            layout={{ width: 0, height: 8, flexShrink: 0 }}
                        />
                        <Button
                            variant="3"
                            name="appeal_button"
                            onPointerTap={onAppealButton}
                            layout={{ width: 173, height: 30, flexShrink: 0 }}
                        >
                            {t('report.status.button.appeal')}
                        </Button>
                    </Region>
                </Bubble>
            )}
        </Frame>
    );
};
