import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1003_habboween_engraving_xml` (layout "habboween_engraving", 375x210) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboweenEngravingLayoutProps {
    layout?: BoxLayout;
}

export const HabboweenEngravingLayout = ({ layout }: HabboweenEngravingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 375, height: 210, ...layout }}>
            <Region
                params={1}
                layout={{ position: 'absolute', left: 0, width: 375, top: 0, height: 210 }}
            >
                <ThemeImage
                    name="background"
                    params={16}
                    src="${image.library.url}furniextras/loveLock_hween14.png"
                    layout={{ position: 'absolute', left: 0, width: 375, top: 0, height: 210 }}
                />
                <Region
                    name="header"
                    params={16}
                    layout={{ position: 'absolute', left: 82, width: 217, top: 130, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('habboween.engraving.caption')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#2a2420', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="avatar_left"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 115, width: 70, top: 7, height: 115 }}
                />
                <ThemeImage
                    name="avatar_right"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 186, width: 70, top: 7, height: 115 }}
                />
                <Region
                    name="name_left"
                    params={16}
                    layout={{ position: 'absolute', left: 20, width: 150, top: 175, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={t('habboween.engraving.left')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#6b115c', align: 'right' }}
                    />
                </Region>
                <Region
                    name="name_right"
                    params={16}
                    layout={{ position: 'absolute', left: 190, width: 161, top: 175, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('habboween.engraving.right')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#6b115c' }}
                    />
                </Region>
                <Region
                    name="date"
                    params={16}
                    layout={{ position: 'absolute', left: 143, width: 97, top: 154, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                />
                <Region
                    name="header_button_close"
                    params={17}
                    layout={{ position: 'absolute', left: 330, width: 21, top: 33, height: 17 }}
                />
            </Region>
        </Region>
    );
};
