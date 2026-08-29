import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `blocked_container` of NewExtendedProfileLayout - configured through the parent's `blockedContainer` prop. */
export interface NewExtendedProfileLayoutBlockedContainerProps {
    blockedBg?: ReactNode;
    blockedBg2?: ReactNode;
    blockedBg3?: ReactNode;
    blockedBg4?: ReactNode;
    blockedBg5?: ReactNode;
    captionBlockedHtml?: string;
    layout?: BoxLayout;
    onBlockedContainer?: () => void;
    srcFrankStop?: string;
    visibleBlockedContainer?: boolean;
}

export const NewExtendedProfileLayoutBlockedContainer = ({ blockedBg, blockedBg2, blockedBg3, blockedBg4, blockedBg5, captionBlockedHtml, layout, onBlockedContainer, srcFrankStop, visibleBlockedContainer }: NewExtendedProfileLayoutBlockedContainerProps) => {
    const t = useTranslation();

    return (
        (visibleBlockedContainer ?? false) && (
            <Region
                name="blocked_container"
                onPointerTap={onBlockedContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: -2, width: 519, top: -3, height: 503, ...layout }}
            >
                <Region
                    name="blocked_bg"
                    backgroundColor="#898985"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 497 }}
                >
                    {blockedBg}
                </Region>
                <Region
                    name="blocked_bg"
                    backgroundColor="#898985"
                    layout={{ position: 'absolute', left: 1, width: 517, top: 497, height: 2 }}
                >
                    {blockedBg2}
                </Region>
                <Region
                    name="blocked_bg"
                    backgroundColor="#898985"
                    layout={{ position: 'absolute', left: 2, width: 515, top: 499, height: 1 }}
                >
                    {blockedBg3}
                </Region>
                <Region
                    name="blocked_bg"
                    backgroundColor="#898985"
                    layout={{ position: 'absolute', left: 3, width: 513, top: 500, height: 1 }}
                >
                    {blockedBg4}
                </Region>
                <Region
                    name="blocked_bg"
                    backgroundColor="#898985"
                    layout={{ position: 'absolute', left: 5, width: 509, top: 501, height: 1 }}
                >
                    {blockedBg5}
                </Region>
                <Border
                    variant="2"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 44, width: 250, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 100 }}
                >
                    <Region
                        name="blocked_html"
                        layout={{ position: 'absolute', left: 13, width: 218, top: 14, minWidth: 218, maxWidth: 218, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBlockedHtml ?? t('extendedprofile.blocked')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="frank_stop"
                    src={srcFrankStop ?? layoutImage('extended_profile_frank_stop.png')}
                    layout={{ position: 'absolute', left: 312, width: 148, top: 146, height: 192 }}
                />
            </Region>
        )
    );
};
