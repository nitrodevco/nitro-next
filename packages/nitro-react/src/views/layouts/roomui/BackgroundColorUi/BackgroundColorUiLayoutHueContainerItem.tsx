import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `hue_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutHueContainerItemProps {
    captionParameter?: string;
    layout?: BoxLayout;
    srcSliderBase?: string;
    srcSliderButton?: string;
    tintSliderBase?: string;
    tintSliderButton?: string;
    visibleParameter?: boolean;
    visibleSliderBase?: boolean;
    visibleSliderButton?: boolean;
    visibleSliderMovementArea?: boolean;
}

export const BackgroundColorUiLayoutHueContainerItem = ({ captionParameter, layout, srcSliderBase, srcSliderButton, tintSliderBase, tintSliderButton, visibleParameter, visibleSliderBase, visibleSliderButton, visibleSliderMovementArea }: BackgroundColorUiLayoutHueContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hue_container"
            layout={{ width: 251, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleParameter ?? true) && (
                <Region
                    name="parameter"
                    layout={{ position: 'absolute', left: 0, width: 144, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionParameter ?? t('widget.backgroundcolor.hue')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleSliderBase ?? true) && (
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase}
                    tint={tintSliderBase}
                    layout={{ position: 'absolute', marginLeft: -23, marginRight: 23, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
                />
            )}
            {(visibleSliderMovementArea ?? true) && (
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, width: 206, bottom: 12, height: 17 }}
                >
                    {(visibleSliderButton ?? true) && (
                        <ThemeImage
                            name="slider_button"
                            src={srcSliderButton}
                            tint={tintSliderButton}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 17 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
