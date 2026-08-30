import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1229_promo_duckets_xml` (layout "promo_duckets", 278x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PromoDucketsLayoutProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const PromoDucketsLayout = ({ layout, onCloseButton }: PromoDucketsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 278, height: 44, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 278, top: 0, bottom: 0 }}>
                <Border
                    variant="6"
                    tintColor="#757575"
                    layout={{ position: 'absolute', left: 0, width: 267, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#24231e"
                        layout={{ position: 'absolute', left: 3, width: 261, top: 3, height: 37 }}
                    >
                        <ThemeText
                            text={t('purse.duckets.promo')}
                            textStyle="text-style-u-italic"
                            textOptions={{ fill: '#757575', wordWrap: true, wordWrapWidth: 231 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 30, width: 231, top: 0, bottom: 0 }}
                        />
                        <Region
                            name="close_button"
                            onPointerTap={onCloseButton}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                        >
                            <ThemeImage
                                src={layoutImage('common_promo_arrow_close.png')}
                                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 11 }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    src={layoutImage('common_promo_arrow_top_right.png')}
                    layout={{ position: 'absolute', right: 0, width: 17, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
