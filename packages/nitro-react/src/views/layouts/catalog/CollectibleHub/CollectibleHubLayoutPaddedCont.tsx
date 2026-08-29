import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `padded_cont` of CollectibleHubLayout - configured through the parent's `paddedCont` prop. */
export interface CollectibleHubLayoutPaddedContProps {
    captionProgressBarText?: string;
    captionRewardFurniName?: string;
    layout?: BoxLayout;
    progressBarBottom?: ReactNode;
    progressBarTop?: ReactNode;
}

export const CollectibleHubLayoutPaddedCont = ({ captionProgressBarText, captionRewardFurniName, layout, progressBarBottom, progressBarTop }: CollectibleHubLayoutPaddedContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="padded_cont"
            layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 52, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 282, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('collectibles.preview.completion_bonus')}
                    textOptions={{ fill: '#ffd300', align: 'center' }}
                />
            </Region>
            <Region
                name="reward_furni_name"
                layout={{ position: 'absolute', left: 0, width: 282, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionRewardFurniName ?? 'Lorem ipsum hot air balloon'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="progress_bar"
                backgroundColor="#112e31"
                layout={{ position: 'absolute', left: 0, width: 282, top: 34, height: 18 }}
            >
                <Region
                    name="progress_padded_bar"
                    layout={{ position: 'absolute', left: 1, width: 280, top: 1, height: 16 }}
                >
                    <Region
                        name="progress_bar_top"
                        backgroundColor="#00910a"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8 }}
                    >
                        {progressBarTop}
                    </Region>
                    <Region
                        name="progress_bar_bottom"
                        backgroundColor="#037c00"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8 }}
                    >
                        {progressBarBottom}
                    </Region>
                </Region>
                <Region
                    name="progress_bar_text"
                    layout={{ position: 'absolute', left: 0, width: 282, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionProgressBarText ?? t('shop.minting.time_left')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
