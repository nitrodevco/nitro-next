import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { PremiumPurchaseConfirmationLayoutBenefits, PremiumPurchaseConfirmationLayoutBenefitsProps } from './PremiumPurchaseConfirmationLayoutBenefits';

/** Named region `top_body` of PremiumPurchaseConfirmationLayout - configured through the parent's `topBody` prop. */
export interface PremiumPurchaseConfirmationLayoutTopBodyProps {
    benefits?: PremiumPurchaseConfirmationLayoutBenefitsProps;
    layout?: BoxLayout;
    srcPremiumIcon?: string;
}

export const PremiumPurchaseConfirmationLayoutTopBody = ({ benefits, layout, srcPremiumIcon }: PremiumPurchaseConfirmationLayoutTopBodyProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_body"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 208, ...layout }}
        >
            <Border
                variant="15"
                name="premium_icon_panel"
                tintColor="#f5def8"
                layout={{ position: 'absolute', left: 0, width: 132, top: 0, bottom: 0 }}
            >
                <Border
                    variant="15"
                    name="premium_icon_frame"
                    tintColor="#fff4ff"
                    layout={{ position: 'absolute', left: 13, width: 106, top: 13, height: 92 }}
                >
                    <ThemeImage
                        name="premium_icon"
                        src={srcPremiumIcon ?? layoutImage('reward_track_premium_track.png')}
                        layout={{ position: 'absolute', left: 20, width: 67, top: 12, height: 67 }}
                    />
                </Border>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 115, bottom: 12 }}>
                    <Region layout={{ position: 'absolute', left: 0, right: 0, alignSelf: 'center', height: 35, flexDirection: 'column' }}>
                        <ThemeText
                            text={t('reward_track.rewards.premium')}
                            textOptions={{ fill: '#5d2c82', align: 'center' }}
                            layout={{ width: 116, height: 19, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('reward_track.rewards.premium.info')}
                            textOptions={{ fill: '#4d3559', wordWrap: true, wordWrapWidth: 116, align: 'center' }}
                            verticalAlign="top"
                            layout={{ width: 116, height: 16, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </Border>
            <PremiumPurchaseConfirmationLayoutBenefits {...benefits} />
        </Region>
    );
};
