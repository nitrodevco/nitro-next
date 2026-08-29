import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredMenuViewLayoutHeaderDetail, WiredMenuViewLayoutHeaderDetailProps } from './WiredMenuViewLayoutHeaderDetail';

/** Named region `header_container` of WiredMenuViewLayout - configured through the parent's `headerContainer` prop. */
export interface WiredMenuViewLayoutHeaderContainerProps {
    captionHeaderTitle?: string;
    headerDetail?: WiredMenuViewLayoutHeaderDetailProps;
    headerInner?: ReactNode;
    layout?: BoxLayout;
    onDiscordRegion?: () => void;
}

export const WiredMenuViewLayoutHeaderContainer = ({ captionHeaderTitle, headerDetail, headerInner, layout, onDiscordRegion }: WiredMenuViewLayoutHeaderContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_container"
            layout={{ position: 'absolute', left: 1, width: 498, top: 32, height: 50, ...layout }}
        >
            <Region
                name="header_border"
                backgroundColor="#486f81"
                layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 50 }}
            >
                <Region
                    name="header_inner"
                    backgroundColor="#235061"
                    layout={{ position: 'absolute', left: 2, width: 494, top: 2, height: 46 }}
                >
                    {headerInner}
                </Region>
            </Region>
            <WiredMenuViewLayoutHeaderDetail {...headerDetail} />
            <Region
                name="header_title"
                layout={{ position: 'absolute', left: 0, width: 500, top: 14, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderTitle ?? 'Header Title'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="discord_region"
                tooltip={t('wiredmenu.discord_region.tooltip')}
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onDiscordRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 473, width: 22, top: 3, height: 25 }}
            >
                <ThemeImage
                    src={layoutImage('icon_discord.png')}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 1, height: 23 }}
                />
            </Region>
        </Region>
    );
};
