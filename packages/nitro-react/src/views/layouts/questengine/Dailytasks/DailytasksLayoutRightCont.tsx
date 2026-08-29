import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { DailytasksLayoutRewardTemplateItem } from './DailytasksLayoutRewardTemplateItem';

/** Named region `right_cont` of DailytasksLayout - configured through the parent's `rightCont` prop. */
export interface DailytasksLayoutRightContProps {
    captionClaimTxt?: string;
    captionRewardTitleText?: string;
    itemsRewardsList?: ReactNode;
    layout?: BoxLayout;
    onClaimButton?: () => void;
    progressBarWrapper?: ReactNode;
    visibleProgressBarWrapper?: boolean;
}

export const DailytasksLayoutRightCont = ({ captionClaimTxt, captionRewardTitleText, itemsRewardsList, layout, onClaimButton, progressBarWrapper, visibleProgressBarWrapper }: DailytasksLayoutRightContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_cont"
            layout={{ position: 'absolute', left: 286, width: 110, top: 6, height: 113, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                name="reward_title_border"
                tintColor="#a6ce92"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 28 }}
            >
                <Region
                    name="reward_title_text"
                    layout={{ position: 'absolute', left: 0, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionRewardTitleText ?? t('dailytasks.reward')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
            <Region
                name="rewards_list"
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, top: 28, flexDirection: 'row', gap: 4 }}
            >
                {itemsRewardsList ?? (
                    <DailytasksLayoutRewardTemplateItem />
                )}
            </Region>
            <Region
                name="right_bottom_cont"
                layout={{ position: 'absolute', left: 0, right: 0, top: 84, height: 29 }}
            >
                <Region
                    name="claim_button_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, justifyContent: 'center' }}
                >
                    <Button
                        variant="5"
                        name="claim_button"
                        tintColor="#01a101"
                        onPointerTap={onClaimButton}
                        layout={{ position: 'absolute', width: 110, top: 0, bottom: 0, minWidth: 110, maxWidth: 110 }}
                    />
                    <Region
                        name="claim_txt"
                        layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 91, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionClaimTxt ?? t('dailytasks.claim')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                {(visibleProgressBarWrapper ?? false) && (
                    <Region
                        name="progress_bar_wrapper"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, minWidth: 110, maxWidth: 110, minHeight: 23, maxHeight: 23 }}
                    >
                        {progressBarWrapper}
                    </Region>
                )}
            </Region>
        </Region>
    );
};
