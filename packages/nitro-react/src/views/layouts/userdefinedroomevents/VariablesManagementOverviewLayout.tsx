import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1160_variables_management_overview_xml` (layout "transaction_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementOverviewLayoutProps {
    captionInfoText?: string;
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    captionSortTypeKey?: string;
    captionUserTypeKey?: string;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsRight?: ReactNode;
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onRefreshBtn?: () => void;
    onSortTypeMenu?: () => void;
    onUserTypeMenu?: () => void;
    visibleSearchingIcon?: boolean;
}

export const VariablesManagementOverviewLayout = ({ captionInfoText, captionPaginaTextEnd, captionPaginaTextStart, captionSortTypeKey, captionUserTypeKey, itemsFooterButtonsLeft, itemsFooterButtonsRight, itemsKeyValuePairs, layout, onClose, onRefreshBtn, onSortTypeMenu, onUserTypeMenu, visibleSearchingIcon }: VariablesManagementOverviewLayoutProps) => {
    const t = useTranslation();
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('wiredmenu.variable_management.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 700, height: 508, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 117 }}
                >
                    <Border
                        variant="4"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 603, top: 7, height: 38 }}
                    >
                        <Region
                            name="info_text"
                            params={2185}
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
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 400, top: 55, height: 20, flexDirection: 'column', gap: 2 }}
                    >
                        {itemsKeyValuePairs ?? (
                            <VariablesManagementOverviewLayoutPairItem />
                        )}
                    </Region>
                    <Region
                        name="user_type_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 217, top: 80, height: 25 }}
                    >
                        <Region
                            name="user_type_key"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 63, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionUserTypeKey ?? t('wiredmenu.variable_management.usertype')} />
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="user_type_menu"
                            params={17}
                            onPointerTap={onUserTypeMenu}
                            layout={{ position: 'absolute', left: 68, width: 131, top: 0, height: 25 }}
                        />
                    </Region>
                    <Region
                        name="sort_type_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 247, width: 217, top: 80, height: 25 }}
                    >
                        <Region
                            name="sort_type_key"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionSortTypeKey ?? t('wiredmenu.variable_management.sort_by')} />
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="sort_type_menu"
                            params={17}
                            onPointerTap={onSortTypeMenu}
                            layout={{ position: 'absolute', left: 53, width: 135, top: 0, height: 25 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="refresh_btn"
                        params={393297}
                        onPointerTap={onRefreshBtn}
                        layout={{ position: 'absolute', right: 17, width: 62, top: 12, height: 30 }}
                    >
                        {t('wiredmenu.list_view.refresh')}
                    </Button>
                    <Region
                        visible={visibleSearchingIcon ?? false}
                        layout={{ position: 'absolute', left: 667, width: 15, top: 50, height: 15 }}
                    >
                        <Icon
                            variant="23"
                            name="searching_icon"
                            params={16}
                            layout={{ width: '100%', height: '100%' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="middle"
                    params={2192}
                    layout={{ position: 'absolute', left: 1, right: 1, top: 117, bottom: 95 }}
                >
                    <Region
                        name="table_view"
                        params={2192}
                        layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0 }}
                    />
                </Region>
                <Region
                    name="footer"
                    params={1049744}
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 35, height: 60 }}
                >
                    <Region
                        name="pagination"
                        params={1168}
                        layout={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 30, justifyContent: 'center' }}
                    >
                        <Region
                            name="footer_buttons_left"
                            params={16}
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
                            params={262224}
                            layout={{ position: 'absolute', right: 17, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
                        >
                            {itemsFooterButtonsRight ?? (
                                <>
                                    <VariablesManagementOverviewLayoutNextPageBtnItem />
                                    <VariablesManagementOverviewLayoutLastPageBtnItem />
                                </>
                            )}
                        </Region>
                        <Region
                            params={786640}
                            layout={{ position: 'absolute', width: 226, top: 4, height: 25, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="pagina_text_start"
                                params={16}
                                layout={{ width: 175, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionPaginaTextStart ?? 'X entries found. Showing page '} />
                            </Region>
                            <TextInput
                                value={paginaNumberInputValue}
                                onChange={setPaginaNumberInputValue}
                                layout={{ width: 21, height: 17, flexShrink: 0 }}
                            />
                            <Region
                                name="pagina_text_end"
                                params={16}
                                layout={{ width: 26, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionPaginaTextEnd ?? 'of Y'} />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
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
            params={16}
            layout={{ width: 88, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionVariableNameKey ?? t('wiredmenu.variable_management.variable_name')} />
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
            params={16}
            layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionVariableNameValue ?? 'name'} />
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
            params={16}
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
            params={17}
            onPointerTap={onFirstPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                params={16}
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="4"
                params={16}
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
            params={17}
            onPointerTap={onPrevPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                params={16}
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
            params={17}
            onPointerTap={onNextPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                params={16}
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
            params={17}
            onPointerTap={onLastPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                params={16}
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="5"
                params={16}
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};
