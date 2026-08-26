import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1160_variables_management_overview_xml` (layout "transaction_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementOverviewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onFirstPageBtn?: () => void;
    onLastPageBtn?: () => void;
    onNextPageBtn?: () => void;
    onPrevPageBtn?: () => void;
    onRefreshBtn?: () => void;
    onSortTypeMenu?: () => void;
    onUserTypeMenu?: () => void;
}

export const VariablesManagementOverviewLayout = ({ layout, onClose, onFirstPageBtn, onLastPageBtn, onNextPageBtn, onPrevPageBtn, onRefreshBtn, onSortTypeMenu, onUserTypeMenu }: VariablesManagementOverviewLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 700, top: 0, height: 117 }}
                >
                    <Border
                        variant="4"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 603, top: 7, height: 38 }}
                    >
                        <Region
                            name="info_text"
                            params={2185}
                            layout={{ position: 'absolute', left: 1, width: 600, top: 3, height: 32, minWidth: 600, maxWidth: 600, minHeight: 32, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text="This is a tool to manage all users that hold a permanent variable.For variables that are shared with other rooms, there is a possible 20 second synchronization delay."
                                textOptions={{ wordWrap: true, wordWrapWidth: 600, align: 'center' }}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="key_value_pairs"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 400, top: 55, height: 20, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            name="pair"
                            params={16}
                            layout={{ width: 125, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="variable_name_key"
                                params={16}
                                layout={{ width: 88, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.variable_management.variable_name')} />
                            </Region>
                            <Region
                                name="variable_name_value"
                                params={16}
                                layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="name" />
                            </Region>
                        </Region>
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
                            <ThemeText text={t('wiredmenu.variable_management.usertype')} />
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
                            <ThemeText text={t('wiredmenu.variable_management.sort_by')} />
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
                        layout={{ position: 'absolute', left: 621, width: 62, top: 12, height: 30 }}
                    >
                        {t('wiredmenu.list_view.refresh')}
                    </Button>
                    <Region
                        visible={false}
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
                    layout={{ position: 'absolute', left: 1, width: 698, top: 117, height: 296 }}
                >
                    <Region
                        name="table_view"
                        params={2192}
                        layout={{ position: 'absolute', left: 13, width: 672, top: 0, height: 296 }}
                    />
                </Region>
                <Region
                    name="footer"
                    params={1049744}
                    layout={{ position: 'absolute', left: 0, width: 700, top: 413, height: 60 }}
                >
                    <Region
                        name="pagination"
                        params={1168}
                        layout={{ position: 'absolute', left: 0, width: 700, top: 16, height: 30 }}
                    >
                        <Region
                            name="footer_buttons_left"
                            params={16}
                            layout={{ position: 'absolute', left: 17, width: 113, top: 0, height: 30, flexDirection: 'row', gap: 13 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="first_page_btn"
                                params={17}
                                onPointerTap={onFirstPageBtn}
                                layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50 }}
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
                            <ContainerButton
                                variant="3"
                                name="prev_page_btn"
                                params={17}
                                onPointerTap={onPrevPageBtn}
                                layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50 }}
                            >
                                <Icon
                                    variant="4"
                                    params={16}
                                    tintColor="#000000"
                                    layout={{ position: 'absolute', left: 22, width: 10, top: 10, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="footer_buttons_right"
                            params={262224}
                            layout={{ position: 'absolute', left: 573, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="next_page_btn"
                                params={17}
                                onPointerTap={onNextPageBtn}
                                layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50 }}
                            >
                                <Icon
                                    variant="5"
                                    params={16}
                                    tintColor="#000000"
                                    layout={{ position: 'absolute', left: 23, width: 10, top: 10, height: 10 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="3"
                                name="last_page_btn"
                                params={17}
                                onPointerTap={onLastPageBtn}
                                layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50 }}
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
                        </Region>
                        <Region
                            params={786640}
                            layout={{ position: 'absolute', left: 237, width: 226, top: 4, height: 25, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="pagina_text_start"
                                params={16}
                                layout={{ width: 175, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="X entries found. Showing page " />
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
                                <ThemeText text="of Y" />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
