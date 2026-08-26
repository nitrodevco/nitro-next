import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1229_promo_duckets_xml` (layout "promo_duckets", 278x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PromoDucketsLayoutProps {
    layout?: BoxLayout;
}

export const PromoDucketsLayout = ({ layout }: PromoDucketsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 278, height: 44, ...layout }}>
            <Region
                params={16448}
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 44 }}
            >
                <Border
                    variant="6"
                    params={12582928}
                    tintColor="#757575"
                    layout={{ position: 'absolute', left: 0, width: 267, top: 0, height: 44 }}
                >
                    <Border
                        variant="3"
                        params={12730384}
                        tintColor="#24231e"
                        layout={{ position: 'absolute', left: 3, width: 261, top: 3, height: 37 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 30, width: 231, top: 0, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('purse.duckets.promo')}
                                textStyle="text-style-u-italic"
                                textOptions={{ fill: '#757575', wordWrap: true, wordWrapWidth: 231 }}
                            />
                        </Region>
                        <Region
                            name="close_button"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('common_promo_arrow_close.png')}
                                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 11 }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    params={80}
                    src={layoutImage('common_promo_arrow_top_right.png')}
                    layout={{ position: 'absolute', left: 261, width: 17, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
