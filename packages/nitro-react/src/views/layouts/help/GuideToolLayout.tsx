import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2926_guide_tool_xml` (layout "guide_tool_threeway", 242x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideToolLayoutProps {
    captionStatusCaptionTxt?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onGuideToolDuty?: () => void;
}

export const GuideToolLayout = ({ captionStatusCaptionTxt, itemsList, layout, onClose, onGuideToolDuty }: GuideToolLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_tool"
            name="guide_tool"
            params={32801}
            caption={t('guide.help.guide.tool.title')}
            onClose={onClose}
            layout={{ width: 242, height: 306, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 8, top: 0, flexDirection: 'column', gap: 5 }}
                >
                    {itemsList ?? (
                        <>
                            <GuideToolLayoutHandleSelectionContainerItem />
                            <GuideToolLayoutOnlineCountsContainerItem />
                            <GuideToolLayoutGuideToolTalentItem />
                        </>
                    )}
                    <Border
                        variant="102"
                        params={16}
                        layout={{ width: 226, height: 65, flexShrink: 0 }}
                    >
                        <CheckBox
                            variant="100"
                            name="guide_tool_duty"
                            params={17}
                            onPointerTap={onGuideToolDuty}
                            layout={{ position: 'absolute', left: 15, width: 200, top: 24, height: 21, minHeight: 21, maxHeight: 21 }}
                        >
                            Off duty right now
                        </CheckBox>
                        <Region
                            name="status_caption_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 58, width: 150, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStatusCaptionTxt ?? t('guide.help.guide.tool.yourstatus')}
                                textOptions={{ fill: '#666666' }}
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `handle_selection_container` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutHandleSelectionContainerItemProps {
    layout?: BoxLayout;
    onHandleGuardianTickets?: () => void;
    onHandleGuideTickets?: () => void;
    onHandleHelperTickets?: () => void;
    srcSelectionSeparator?: string;
}

export const GuideToolLayoutHandleSelectionContainerItem = ({ layout, onHandleGuardianTickets, onHandleGuideTickets, onHandleHelperTickets, srcSelectionSeparator }: GuideToolLayoutHandleSelectionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handle_selection_container"
            params={16}
            layout={{ width: 227, height: 97, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 14, width: 246, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('guide.help.guide.tool.tickettypeselection.caption')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <CheckBox
                variant="101"
                name="handle_guide_tickets"
                params={17}
                onPointerTap={onHandleGuideTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 21, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.guiderequests')}
            </CheckBox>
            <CheckBox
                variant="101"
                name="handle_helper_tickets"
                params={17}
                onPointerTap={onHandleHelperTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 45, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.onlyhelprequests')}
            </CheckBox>
            <CheckBox
                variant="101"
                name="handle_guardian_tickets"
                params={17}
                onPointerTap={onHandleGuardianTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 69, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.bullyreports')}
            </CheckBox>
            <ThemeImage
                name="selection_separator"
                params={16}
                src={srcSelectionSeparator ?? layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 229, top: 94, height: 2 }}
            />
            <Region
                name="disabled_screen"
                params={17}
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, width: 227, top: 0, height: 90 }}
            />
        </Region>
    );
};

/** Row template `online_counts_container` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutOnlineCountsContainerItemProps {
    layout?: BoxLayout;
    srcInfoImg?: string;
}

export const GuideToolLayoutOnlineCountsContainerItem = ({ layout, srcInfoImg }: GuideToolLayoutOnlineCountsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="online_counts_container"
            params={16}
            layout={{ width: 227, height: 61, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="info_img"
                params={16}
                src={srcInfoImg ?? layoutImage('common_info_icon_grey.png')}
                layout={{ position: 'absolute', left: 4, width: 23, top: 13, height: 24 }}
            />
            <Region
                params={16}
                layout={{ position: 'absolute', left: 31, width: 188, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('guide.help.guide.tool.guidesonduty')} />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 31, width: 193, top: 17, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('guide.help.guide.tool.helpersonduty')} />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 31, width: 206, top: 34, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('guide.help.guide.tool.guardiansonduty')} />
            </Region>
            <ThemeImage
                params={16}
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 229, top: 54, height: 2 }}
            />
        </Region>
    );
};

/** Row template `guide_tool_talent` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutGuideToolTalentItemProps {
    captionGuideToolTalent?: string;
    layout?: BoxLayout;
    onGuideToolTalent?: () => void;
}

export const GuideToolLayoutGuideToolTalentItem = ({ captionGuideToolTalent, layout, onGuideToolTalent }: GuideToolLayoutGuideToolTalentItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide_tool_talent"
            tooltip={t('guide.help.guide.tool.skill.tooltip')}
            params={1}
            layout={{ width: 226, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
            onPointerTap={onGuideToolTalent}
            cursor="pointer"
        >
            <ThemeText
                text={captionGuideToolTalent ?? t('guide.help.guide.tool.skill.link')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
