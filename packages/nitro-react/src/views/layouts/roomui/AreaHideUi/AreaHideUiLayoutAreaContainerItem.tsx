import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { AreaHideUiLayoutClearButtonItem } from './AreaHideUiLayoutClearButtonItem';
import { AreaHideUiLayoutSelectButtonItem } from './AreaHideUiLayoutSelectButtonItem';

/** Row template `area_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutAreaContainerItemProps {
    captionAreaselectionInfo?: string;
    captionAreaselectionTitle?: string;
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
    visibleAreaselectionInfo?: boolean;
    visibleAreaselectionTitle?: boolean;
    visibleButtonContainer?: boolean;
}

export const AreaHideUiLayoutAreaContainerItem = ({ captionAreaselectionInfo, captionAreaselectionTitle, itemsButtonContainer, layout, visibleAreaselectionInfo, visibleAreaselectionTitle, visibleButtonContainer }: AreaHideUiLayoutAreaContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="area_container"
            layout={{ width: 260, height: 98, flexShrink: 0, ...layout }}
        >
            {(visibleAreaselectionTitle ?? true) && (
                <Region
                    name="areaselection_title"
                    layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAreaselectionTitle ?? t('widget.areahide.area_selection')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleAreaselectionInfo ?? true) && (
                <Region
                    name="areaselection_info"
                    layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAreaselectionInfo ?? t('widget.areahide.area_selection.info')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                    />
                </Region>
            )}
            {(visibleButtonContainer ?? true) && (
                <Region
                    name="button_container"
                    layout={{ position: 'absolute', left: 0, width: 260, top: 66, height: 25, flexDirection: 'row', gap: 12 }}
                >
                    {itemsButtonContainer ?? (
                        <>
                            <AreaHideUiLayoutSelectButtonItem />
                            <AreaHideUiLayoutClearButtonItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
