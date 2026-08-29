import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `header_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutHeaderContainerItemProps {
    captionHideareaInfo?: string;
    layout?: BoxLayout;
    visibleHeaderContainer?: boolean;
    visibleHideareaInfo?: boolean;
}

export const AreaHideUiLayoutHeaderContainerItem = ({ captionHideareaInfo, layout, visibleHeaderContainer, visibleHideareaInfo }: AreaHideUiLayoutHeaderContainerItemProps) => {
    const t = useTranslation();

    return (
        (visibleHeaderContainer ?? false) && (
            <Region
                name="header_container"
                layout={{ alignSelf: 'stretch', height: 0, flexShrink: 0, ...layout }}
            >
                {(visibleHideareaInfo ?? false) && (
                    <Region
                        name="hidearea_info"
                        layout={{ position: 'absolute', left: 4, right: 4, top: 4, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHideareaInfo ?? t('widget.areahide.info')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                        />
                    </Region>
                )}
            </Region>
        )
    );
};
