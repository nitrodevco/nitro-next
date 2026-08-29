import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

import { GuideToolLayoutGuideToolTalentItem } from './GuideToolLayoutGuideToolTalentItem';
import { GuideToolLayoutHandleSelectionContainerItem } from './GuideToolLayoutHandleSelectionContainerItem';
import { GuideToolLayoutOnlineCountsContainerItem } from './GuideToolLayoutOnlineCountsContainerItem';

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
