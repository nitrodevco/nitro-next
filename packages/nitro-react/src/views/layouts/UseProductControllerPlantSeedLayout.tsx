import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1092_use_product_controller_plant_seed_xml` (layout "use_product_plant_seed", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerPlantSeedLayoutProps {
    layout?: BoxLayout;
    onSaveButton?: () => void;
}

export const UseProductControllerPlantSeedLayout = ({ layout, onSaveButton }: UseProductControllerPlantSeedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}
            >
                <ButtonThick
                    variant="3"
                    name="save_button"
                    params={131089}
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 230, width: 145, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.plant_seed')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image_bg"
                    params={16}
                    src={layoutImage('plant_seed_preview_bg.png')}
                    layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130 }}
                />
                <ThemeImage
                    name="preview_image"
                    params={16}
                    src={layoutImage('plant_seed_preview.png')}
                    layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130 }}
                />
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('useproduct.widget.text.plant_seed')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <Region
                    name="cancel_text"
                    params={17}
                    layout={{ position: 'absolute', left: 160, width: 65, top: 118, height: 25 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 160, width: 70, top: 120, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('useproduct.widget.cancel')} />
                </Region>
                <Region
                    name="info"
                    params={16}
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('useproduct.widget.info.plant_seed')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
