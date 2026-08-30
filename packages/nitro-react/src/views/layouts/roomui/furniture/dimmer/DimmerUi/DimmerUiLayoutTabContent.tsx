import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `tab_content` of DimmerUiLayout - configured through the parent's `tabContent` prop. */
export interface DimmerUiLayoutTabContentProps {
    captionDimmerInfo?: string;
    captionTypeText?: string;
    itemsColorGrid?: ReactNode;
    layout?: BoxLayout;
    onColorGridContainer?: () => void;
    onTypeCheckbox?: () => void;
    srcSliderBase?: string;
    srcSliderButton?: string;
    tintSliderBase?: string;
    tintSliderButton?: string;
}

export const DimmerUiLayoutTabContent = ({ captionDimmerInfo, captionTypeText, itemsColorGrid, layout, onColorGridContainer, onTypeCheckbox, srcSliderBase, srcSliderButton, tintSliderBase, tintSliderButton }: DimmerUiLayoutTabContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 228, top: 34, height: 118, ...layout }}
        >
            <Region
                name="color_grid_container"
                onPointerTap={onColorGridContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 2, width: 210, top: 1, height: 30 }}
            >
                <Region
                    name="color_grid"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                >
                    {itemsColorGrid}
                </Region>
            </Region>
            <Region
                name="brightness_container"
                layout={{ position: 'absolute', left: 4, width: 206, top: 35, height: 18, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase}
                    tint={tintSliderBase}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
                />
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 1, bottom: 0 }}
                >
                    <ThemeImage
                        name="slider_button"
                        src={srcSliderButton}
                        tint={tintSliderButton}
                        layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 17 }}
                    />
                </Region>
            </Region>
            <CheckBox
                variant="0"
                name="type_checkbox"
                onPointerTap={onTypeCheckbox}
                layout={{ position: 'absolute', left: 3, width: 18, top: 60, height: 18 }}
            >
                {t('widget.dimmer.title')}
            </CheckBox>
            <ThemeText
                text={captionTypeText ?? t('widget.dimmer.type.checkbox')}
                textOptions={{ fill: '#000000' }}
                name="type_text"
                layout={{ position: 'absolute', right: 6, width: 200, top: 61, height: 14 }}
            />
            <ThemeText
                text={captionDimmerInfo ?? t('widget.dimmer.info')}
                textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 222 }}
                name="dimmer_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 4, right: 2, bottom: -8, height: 46 }}
            />
        </Region>
    );
};
