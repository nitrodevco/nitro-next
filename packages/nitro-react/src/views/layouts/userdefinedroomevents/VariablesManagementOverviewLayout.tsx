import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1160_variables_management_overview_xml` (layout "transaction_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementOverviewLayoutProps {
    footer?: VariablesManagementOverviewLayoutFooterProps;
    header?: VariablesManagementOverviewLayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const VariablesManagementOverviewLayout = ({ footer, header, layout, onClose }: VariablesManagementOverviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredmenu.variable_management.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 700, height: 508, ...layout }}
        >
            <VariablesManagementOverviewLayoutHeader {...header} />
            <Region
                name="middle"
                layout={{ position: 'absolute', left: 1, right: 1, top: 117, bottom: 95 }}
            >
                <Region
                    name="table_view"
                    layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0 }}
                />
            </Region>
            <VariablesManagementOverviewLayoutFooter {...footer} />
        </Frame>
    );
};

/** Row template `variable_name_key` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutVariableNameKeyItemProps {
    captionVariableNameKey?: string;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutVariableNameKeyItem = ({ captionVariableNameKey, layout }: VariablesManagementOverviewLayoutVariableNameKeyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_name_key"
            layout={{ width: 88, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionVariableNameKey ?? t('wiredmenu.variable_management.variable_name')}
        </Region>
    );
};

/** Row template `variable_name_value` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutVariableNameValueItemProps {
    captionVariableNameValue?: string;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutVariableNameValueItem = ({ captionVariableNameValue, layout }: VariablesManagementOverviewLayoutVariableNameValueItemProps) => {
    return (
        <Region
            name="variable_name_value"
            layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionVariableNameValue ?? 'name'}
        </Region>
    );
};

/** Row template `pair` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutPairItemProps {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutPairItem = ({ itemsPair, layout }: VariablesManagementOverviewLayoutPairItemProps) => {
    return (
        <Region
            name="pair"
            layout={{ width: 125, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <VariablesManagementOverviewLayoutVariableNameKeyItem />
                    <VariablesManagementOverviewLayoutVariableNameValueItem />
                </>
            )}
        </Region>
    );
};

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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 117, ...layout }}
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
                    layout={{ position: 'absolute', left: 68, width: 131, top: 0, height: 25 }}
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
                    layout={{ position: 'absolute', left: 53, width: 135, top: 0, height: 25 }}
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

/** Row template `first_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutFirstPageBtnItemProps {
    layout?: BoxLayout;
    onFirstPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutFirstPageBtnItem = ({ layout, onFirstPageBtn }: VariablesManagementOverviewLayoutFirstPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="first_page_btn"
            onPointerTap={onFirstPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `prev_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutPrevPageBtnItemProps {
    layout?: BoxLayout;
    onPrevPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutPrevPageBtnItem = ({ layout, onPrevPageBtn }: VariablesManagementOverviewLayoutPrevPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="prev_page_btn"
            onPointerTap={onPrevPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 22, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `next_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutNextPageBtnItemProps {
    layout?: BoxLayout;
    onNextPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutNextPageBtnItem = ({ layout, onNextPageBtn }: VariablesManagementOverviewLayoutNextPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="next_page_btn"
            onPointerTap={onNextPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 23, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `last_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutLastPageBtnItemProps {
    layout?: BoxLayout;
    onLastPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutLastPageBtnItem = ({ layout, onLastPageBtn }: VariablesManagementOverviewLayoutLastPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="last_page_btn"
            onPointerTap={onLastPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Named region `pagination` of VariablesManagementOverviewLayout - configured through the parent's `pagination` prop. */
export interface VariablesManagementOverviewLayoutPaginationProps {
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsRight?: ReactNode;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutPagination = ({ captionPaginaTextEnd, captionPaginaTextStart, itemsFooterButtonsLeft, itemsFooterButtonsRight, layout }: VariablesManagementOverviewLayoutPaginationProps) => {
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Region
            name="pagination"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 30, justifyContent: 'center', ...layout }}
        >
            <Region
                name="footer_buttons_left"
                layout={{ position: 'absolute', left: 17, width: 113, top: 0, height: 30, flexDirection: 'row', gap: 13 }}
            >
                {itemsFooterButtonsLeft ?? (
                    <>
                        <VariablesManagementOverviewLayoutFirstPageBtnItem />
                        <VariablesManagementOverviewLayoutPrevPageBtnItem />
                    </>
                )}
            </Region>
            <Region
                name="footer_buttons_right"
                layout={{ position: 'absolute', right: 17, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
            >
                {itemsFooterButtonsRight ?? (
                    <>
                        <VariablesManagementOverviewLayoutNextPageBtnItem />
                        <VariablesManagementOverviewLayoutLastPageBtnItem />
                    </>
                )}
            </Region>
            <Region layout={{ position: 'absolute', width: 226, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="pagina_text_start"
                    layout={{ width: 175, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPaginaTextStart ?? 'X entries found. Showing page '}
                </Region>
                <TextInput
                    value={paginaNumberInputValue}
                    onChange={setPaginaNumberInputValue}
                    layout={{ width: 21, height: 17, flexShrink: 0 }}
                />
                <Region
                    name="pagina_text_end"
                    layout={{ width: 26, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPaginaTextEnd ?? 'of Y'}
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `footer` of VariablesManagementOverviewLayout - configured through the parent's `footer` prop. */
export interface VariablesManagementOverviewLayoutFooterProps {
    layout?: BoxLayout;
    pagination?: VariablesManagementOverviewLayoutPaginationProps;
}

export const VariablesManagementOverviewLayoutFooter = ({ layout, pagination }: VariablesManagementOverviewLayoutFooterProps) => {
    return (
        <Region
            name="footer"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 35, height: 60, ...layout }}
        >
            <VariablesManagementOverviewLayoutPagination {...pagination} />
        </Region>
    );
};
