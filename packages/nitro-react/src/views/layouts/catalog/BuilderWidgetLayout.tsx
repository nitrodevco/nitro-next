import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1590_builderWidget_xml` (layout "builderWidget", 360x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BuilderWidgetLayoutProps {
    captionErrorMessage?: string;
    layout?: BoxLayout;
    onPlaceMany?: () => void;
    onPlaceOne?: () => void;
    srcErrorIcon?: string;
}

export const BuilderWidgetLayout = ({ captionErrorMessage, layout, onPlaceMany, onPlaceOne, srcErrorIcon }: BuilderWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 60, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 60 }}
            >
                <ButtonThick
                    variant="5"
                    name="place_one"
                    params={131089}
                    tintColor="#dda100"
                    onPointerTap={onPlaceOne}
                    layout={{ position: 'absolute', left: 30, width: 130, top: 30, height: 30, minWidth: 130, maxWidth: 130 }}
                >
                    {t('builder.placement_widget.place_one')}
                </ButtonThick>
                <ButtonThick
                    variant="5"
                    name="place_many"
                    params={131089}
                    tintColor="#0a9bc5"
                    onPointerTap={onPlaceMany}
                    layout={{ position: 'absolute', left: 201, width: 130, top: 30, height: 30, minWidth: 130, maxWidth: 130 }}
                >
                    {t('builder.placement_widget.place_many')}
                </ButtonThick>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 143, top: 3, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('builder.placement_widget.hint')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="error_container"
                    params={16400}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 25 }}
                >
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#f2d193"
                        layout={{ position: 'absolute', left: 0, width: 360, top: 2, height: 22 }}
                    />
                    <ThemeImage
                        name="error_icon"
                        params={16}
                        src={srcErrorIcon ?? layoutImage('icons_builder_error_full.png')}
                        layout={{ position: 'absolute', left: 4, width: 25, top: 0, height: 25 }}
                    />
                    <Region
                        name="error_message"
                        params={16}
                        layout={{ position: 'absolute', left: 38, width: 105, top: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionErrorMessage ?? 'We have a problem!'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#de0e0a' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
