import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { AreaHideUiLayoutOptionsContainer, AreaHideUiLayoutOptionsContainerProps } from './AreaHideUiLayoutOptionsContainer';

/** Row template `saturation_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSaturationContainerItemProps {
    captionOptionsTitle?: string;
    layout?: BoxLayout;
    optionsContainer?: AreaHideUiLayoutOptionsContainerProps;
    visibleOptionsContainer?: boolean;
    visibleOptionsTitle?: boolean;
}

export const AreaHideUiLayoutSaturationContainerItem = ({ captionOptionsTitle, layout, optionsContainer, visibleOptionsContainer, visibleOptionsTitle }: AreaHideUiLayoutSaturationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saturation_container"
            layout={{ alignSelf: 'stretch', height: 143, flexShrink: 0, ...layout }}
        >
            {(visibleOptionsTitle ?? true) && (
                <ThemeText
                    text={captionOptionsTitle ?? t('widget.areahide.options')}
                    textStyle="text-style-u-small"
                    name="options_title"
                    layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 15 }}
                />
            )}
            {(visibleOptionsContainer ?? true) && (
                <AreaHideUiLayoutOptionsContainer {...optionsContainer} />
            )}
        </Region>
    );
};
