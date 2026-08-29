import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1028_wildwest_engraving_xml` (layout "wildwest_engraving", 375x210) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WildwestEngravingLayoutProps {
    captionDate?: string;
    captionHeader?: string;
    captionNameLeft?: string;
    captionNameRight?: string;
    headerButtonClose?: WildwestEngravingLayoutHeaderButtonCloseProps;
    layout?: BoxLayout;
    srcAvatarLeft?: string;
    srcAvatarRight?: string;
    srcBackground?: string;
}

export const WildwestEngravingLayout = ({ captionDate, captionHeader, captionNameLeft, captionNameRight, headerButtonClose, layout, srcAvatarLeft, srcAvatarRight, srcBackground }: WildwestEngravingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 375, height: 210, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 375, top: 0, height: 210 }}>
                <ThemeImage
                    name="background"
                    src={srcBackground ?? '${image.library.url}furniextras/loveLock_wildwest.png'}
                    layout={{ position: 'absolute', left: 0, width: 375, top: 0, height: 210 }}
                />
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 82, width: 217, top: 126, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeader ?? t('wildwest.engraving.caption')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#59224a', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="avatar_left"
                    src={srcAvatarLeft}
                    layout={{ position: 'absolute', left: 115, width: 70, top: 7, height: 115 }}
                />
                <ThemeImage
                    name="avatar_right"
                    src={srcAvatarRight}
                    layout={{ position: 'absolute', left: 186, width: 70, top: 7, height: 115 }}
                />
                <Region
                    name="name_left"
                    layout={{ position: 'absolute', left: 19, width: 150, top: 175, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionNameLeft ?? t('wildwest.engraving.left')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#59224a', align: 'right' }}
                    />
                </Region>
                <Region
                    name="name_right"
                    layout={{ position: 'absolute', left: 199, width: 87, top: 175, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNameRight ?? t('wildwest.engraving.right')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#59224a' }}
                    />
                </Region>
                <Region
                    name="date"
                    layout={{ position: 'absolute', left: 143, width: 97, top: 151, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDate ?? ''}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#59224a', align: 'center' }}
                    />
                </Region>
                <WildwestEngravingLayoutHeaderButtonClose {...headerButtonClose} />
            </Region>
        </Region>
    );
};

/** Named region `header_button_close` of WildwestEngravingLayout - configured through the parent's `headerButtonClose` prop. */
export interface WildwestEngravingLayoutHeaderButtonCloseProps {
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const WildwestEngravingLayoutHeaderButtonClose = ({ layout, onHeaderButtonClose }: WildwestEngravingLayoutHeaderButtonCloseProps) => {
    return (
        <Region
            name="header_button_close"
            onPointerTap={onHeaderButtonClose}
            cursor="pointer"
            layout={{ position: 'absolute', left: 330, width: 21, top: 33, height: 17, ...layout }}
        />
    );
};
