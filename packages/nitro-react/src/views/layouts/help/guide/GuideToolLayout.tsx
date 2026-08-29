import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2926_guide_tool_xml` (layout "guide_tool_threeway", 242x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideToolLayoutProps {
    layout?: BoxLayout;
    list?: GuideToolLayoutListProps;
    onClose?: () => void;
}

export const GuideToolLayout = ({ layout, list, onClose }: GuideToolLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_tool"
            name="guide_tool"
            caption={t('guide.help.guide.tool.title')}
            onClose={onClose}
            layout={{ width: 242, height: 306, ...layout }}
        >
            <GuideToolLayoutList {...list} />
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
            layout={{ width: 227, height: 97, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 14, width: 246, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.guide.tool.tickettypeselection.caption')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <CheckBox
                variant="101"
                name="handle_guide_tickets"
                onPointerTap={onHandleGuideTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 21, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.guiderequests')}
            </CheckBox>
            <CheckBox
                variant="101"
                name="handle_helper_tickets"
                onPointerTap={onHandleHelperTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 45, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.onlyhelprequests')}
            </CheckBox>
            <CheckBox
                variant="101"
                name="handle_guardian_tickets"
                onPointerTap={onHandleGuardianTickets}
                layout={{ position: 'absolute', left: 15, width: 207, top: 69, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('guide.help.guide.tool.tickettypeselection.bullyreports')}
            </CheckBox>
            <ThemeImage
                name="selection_separator"
                src={srcSelectionSeparator ?? layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 229, top: 94, height: 2 }}
            />
            <Region
                name="disabled_screen"
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
            layout={{ width: 227, height: 61, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="info_img"
                src={srcInfoImg ?? layoutImage('common_info_icon_grey.png')}
                layout={{ position: 'absolute', left: 4, width: 23, top: 13, height: 24 }}
            />
            <Region layout={{ position: 'absolute', left: 31, width: 188, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('guide.help.guide.tool.guidesonduty')} />
            </Region>
            <Region layout={{ position: 'absolute', left: 31, width: 193, top: 17, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('guide.help.guide.tool.helpersonduty')} />
            </Region>
            <Region layout={{ position: 'absolute', left: 31, width: 206, top: 34, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('guide.help.guide.tool.guardiansonduty')} />
            </Region>
            <ThemeImage
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

/** Named region `list` of GuideToolLayout - configured through the parent's `list` prop. */
export interface GuideToolLayoutListProps {
    captionStatusCaptionTxt?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onGuideToolDuty?: () => void;
}

export const GuideToolLayoutList = ({ captionStatusCaptionTxt, itemsList, layout, onGuideToolDuty }: GuideToolLayoutListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 8, top: 0, flexDirection: 'column', gap: 5, ...layout }}
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
                layout={{ width: 226, height: 65, flexShrink: 0 }}
            >
                <CheckBox
                    variant="100"
                    name="guide_tool_duty"
                    onPointerTap={onGuideToolDuty}
                    layout={{ position: 'absolute', left: 15, width: 200, top: 24, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    Off duty right now
                </CheckBox>
                <Region
                    name="status_caption_txt"
                    layout={{ position: 'absolute', left: 58, width: 150, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusCaptionTxt ?? t('guide.help.guide.tool.yourstatus')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
