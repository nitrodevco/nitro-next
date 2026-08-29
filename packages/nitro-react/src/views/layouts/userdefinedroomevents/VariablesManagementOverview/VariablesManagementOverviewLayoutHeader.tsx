import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Icon, Region, ThemeText } from '#base/theme';

import { VariablesManagementOverviewLayoutPairItem } from './VariablesManagementOverviewLayoutPairItem';

/** Named region `header` of VariablesManagementOverviewLayout - configured through the parent's `header` prop. */
export interface VariablesManagementOverviewLayoutHeaderProps {
    captionInfoText?: string;
    captionSortTypeKey?: string;
    captionUserTypeKey?: string;
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
    onRefreshBtn?: () => void;
    onSortTypeMenu?: () => void;
    onUserTypeMenu?: () => void;
    visibleSearchingIcon?: boolean;
}

export const VariablesManagementOverviewLayoutHeader = ({ captionInfoText, captionSortTypeKey, captionUserTypeKey, itemsKeyValuePairs, layout, onRefreshBtn, onSortTypeMenu, onUserTypeMenu, visibleSearchingIcon }: VariablesManagementOverviewLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 117, ...layout }}
        >
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 8, width: 603, top: 7, height: 38 }}
            >
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 1, right: 2, top: 3, bottom: 3, minWidth: 600, maxWidth: 600, minHeight: 32, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionInfoText ?? 'This is a tool to manage all users that hold a permanent variable.For variables that are shared with other rooms, there is a possible 20 second synchronization delay.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 600, align: 'center' }}
                    />
                </Region>
            </Border>
            <Region
                name="key_value_pairs"
                layout={{ position: 'absolute', left: 15, width: 400, top: 55, height: 20, flexDirection: 'column', gap: 2 }}
            >
                {itemsKeyValuePairs ?? (
                    <VariablesManagementOverviewLayoutPairItem />
                )}
            </Region>
            <Region
                name="user_type_cont"
                layout={{ position: 'absolute', left: 15, width: 217, top: 80, height: 25 }}
            >
                <Region
                    name="user_type_key"
                    layout={{ position: 'absolute', left: 0, width: 63, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionUserTypeKey ?? t('wiredmenu.variable_management.usertype')}
                </Region>
                <Dropmenu
                    variant="3"
                    name="user_type_menu"
                    onPointerTap={onUserTypeMenu}
                    layout={{ position: 'absolute', left: 68, width: 131, top: 0, bottom: 0 }}
                />
            </Region>
            <Region
                name="sort_type_cont"
                layout={{ position: 'absolute', left: 247, width: 217, top: 80, height: 25 }}
            >
                <Region
                    name="sort_type_key"
                    layout={{ position: 'absolute', left: 0, width: 47, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionSortTypeKey ?? t('wiredmenu.variable_management.sort_by')}
                </Region>
                <Dropmenu
                    variant="3"
                    name="sort_type_menu"
                    onPointerTap={onSortTypeMenu}
                    layout={{ position: 'absolute', left: 53, width: 135, top: 0, bottom: 0 }}
                />
            </Region>
            <Button
                variant="3"
                name="refresh_btn"
                onPointerTap={onRefreshBtn}
                layout={{ position: 'absolute', right: 17, width: 62, top: 12, height: 30 }}
            >
                {t('wiredmenu.list_view.refresh')}
            </Button>
            {(visibleSearchingIcon ?? false) && (
                <Icon
                    variant="23"
                    name="searching_icon"
                    layout={{ position: 'absolute', left: 667, width: 15, top: 50, height: 15 }}
                />
            )}
        </Region>
    );
};
