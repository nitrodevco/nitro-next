import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { UseProductControllerReviveMonsterplantLayoutPlantItemlistItem } from './UseProductControllerReviveMonsterplantLayoutPlantItemlistItem';

/** Row template `preview_list` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPreviewListItemProps {
    captionDescription?: string;
    captionInfo?: string;
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
    separator?: ReactNode;
    separator2?: ReactNode;
    visibleDescription?: boolean;
    visibleInfo?: boolean;
    visibleSeparator?: boolean;
    visibleSeparator2?: boolean;
}

export const UseProductControllerReviveMonsterplantLayoutPreviewListItem = ({ captionDescription, captionInfo, itemsPreviewList, layout, separator, separator2, visibleDescription, visibleInfo, visibleSeparator, visibleSeparator2 }: UseProductControllerReviveMonsterplantLayoutPreviewListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_list"
            layout={{ flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <UseProductControllerReviveMonsterplantLayoutPlantItemlistItem />
            )}
            <Region layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}>
                {(visibleSeparator ?? true) && (
                    <Region
                        name="separator"
                        layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    >
                        {separator}
                    </Region>
                )}
                {(visibleDescription ?? true) && (
                    <ThemeText
                        text={captionDescription ?? t('useproduct.widget.text.revive_monsterplant')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                        name="description"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 71, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    />
                )}
                {(visibleSeparator2 ?? true) && (
                    <Region
                        name="separator"
                        layout={{ alignSelf: 'stretch', height: 10, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    >
                        {separator2}
                    </Region>
                )}
                {(visibleInfo ?? true) && (
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.revive_monsterplant')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                        name="info"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    />
                )}
            </Region>
        </Region>
    );
};
