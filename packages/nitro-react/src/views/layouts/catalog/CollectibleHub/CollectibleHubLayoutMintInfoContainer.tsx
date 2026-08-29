import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `mint_info_container` of CollectibleHubLayout - configured through the parent's `mintInfoContainer` prop. */
export interface CollectibleHubLayoutMintInfoContainerProps {
    captionMintLockText?: string;
    captionProgressBarText?: string;
    layout?: BoxLayout;
    progressBarBottom?: ReactNode;
    progressBarTop?: ReactNode;
}

export const CollectibleHubLayoutMintInfoContainer = ({ captionMintLockText, captionProgressBarText, layout, progressBarBottom, progressBarTop }: CollectibleHubLayoutMintInfoContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mint_info_container"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 214, height: 46, ...layout }}
        >
            <Region
                name="right_box"
                layout={{ position: 'absolute', left: 64, width: 226, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="mint_lock_text"
                    layout={{ position: 'absolute', marginLeft: 32, marginRight: -32, width: 290, top: 4, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMintLockText ?? t('shop.minting.region_unlocked')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290 }}
                    />
                </Region>
                <Region
                    name="progress_bar"
                    backgroundColor="#112e31"
                    layout={{ position: 'absolute', left: 0, width: 220, top: 24, height: 18 }}
                >
                    <Region
                        name="progress_padded_bar"
                        layout={{ position: 'absolute', left: 1, width: 220, top: 1, height: 16 }}
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
                        layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionProgressBarText ?? t('collectibles.preview.time_left')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
