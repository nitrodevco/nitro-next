import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1179_logs_overview_xml` (layout "logs_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LogsOverviewLayoutProps {
    captionFilterKey?: string;
    captionInfoText?: string;
    captionLogLevelKey?: string;
    captionLogSourceKey?: string;
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsRight?: ReactNode;
    layout?: BoxLayout;
    onAutoRefreshCbx?: () => void;
    onClose?: () => void;
    onLogLevelMenu?: () => void;
    onLogSourceMenu?: () => void;
}

export const LogsOverviewLayout = ({ captionFilterKey, captionInfoText, captionLogLevelKey, captionLogSourceKey, captionPaginaTextEnd, captionPaginaTextStart, itemsFooterButtonsLeft, itemsFooterButtonsRight, layout, onAutoRefreshCbx, onClose, onLogLevelMenu, onLogSourceMenu }: LogsOverviewLayoutProps) => {
    const t = useTranslation();
    const [ filterInputValue, setFilterInputValue ] = useState('');
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('wiredmenu.logs_overview.title')}
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
                        layout={{ position: 'absolute', left: 8, width: 580, top: 7, height: 38 }}
                    >
                        <Region
                            name="info_text"
                            params={2185}
                            layout={{ position: 'absolute', left: 1, right: 1, top: 3, bottom: 3, minWidth: 578, maxWidth: 578, minHeight: 32, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionInfoText ?? t('wiredmenu.logs_overview.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 578, align: 'center' }}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="filter_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 314, top: 60, height: 25 }}
                    >
                        <Region
                            name="filter_key"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 38, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionFilterKey ?? t('wiredmenu.logs_overview.filter')} />
                        </Region>
                        <Border
                            variant="4"
                            params={16}
                            layout={{ position: 'absolute', left: 45, width: 269, top: 0, height: 25 }}
                        >
                            <TextInput
                                value={filterInputValue}
                                onChange={setFilterInputValue}
                                maxLength={400}
                                layout={{ position: 'absolute', left: 6, width: 257, top: 4, height: 18 }}
                            />
                        </Border>
                    </Region>
                    <CheckBox
                        variant="3"
                        name="auto_refresh_cbx"
                        params={17}
                        onPointerTap={onAutoRefreshCbx}
                        layout={{ position: 'absolute', left: 596, width: 15, top: 19, height: 15 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 614, width: 90, top: 18, height: 29, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('wiredmenu.logs_overview.auto_refresh')} />
                    </Region>
                    <Region
                        name="log_source_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 349, width: 164, top: 60, height: 25 }}
                    >
                        <Region
                            name="log_source_key"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 68, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionLogSourceKey ?? t('wiredmenu.logs_overview.log_source')} />
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="log_source_menu"
                            params={17}
                            onPointerTap={onLogSourceMenu}
                            layout={{ position: 'absolute', left: 74, width: 90, top: 0, height: 25 }}
                        />
                    </Region>
                    <Region
                        name="log_level_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 534, width: 154, top: 60, height: 25 }}
                    >
                        <Region
                            name="log_level_key"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 56, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionLogLevelKey ?? t('wiredmenu.logs_overview.log_level')} />
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="log_level_menu"
                            params={17}
                            onPointerTap={onLogLevelMenu}
                            layout={{ position: 'absolute', left: 62, width: 90, top: 0, height: 25 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="middle"
                    params={2192}
                    layout={{ position: 'absolute', left: 1, right: 1, top: 97, bottom: 95 }}
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
                                    <LogsOverviewLayoutFirstPageBtnItem />
                                    <LogsOverviewLayoutPrevPageBtnItem />
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
                                    <LogsOverviewLayoutNextPageBtnItem />
                                    <LogsOverviewLayoutLastPageBtnItem />
                                </>
                            )}
                        </Region>
                        <Region
                            params={786640}
                            layout={{ position: 'absolute', width: 210, top: 4, height: 25, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="pagina_text_start"
                                params={16}
                                layout={{ width: 159, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionPaginaTextStart ?? 'X logs found. Showing page '} />
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

/** Row template `first_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutFirstPageBtnItemProps {
    layout?: BoxLayout;
    onFirstPageBtn?: () => void;
}

export const LogsOverviewLayoutFirstPageBtnItem = ({ layout, onFirstPageBtn }: LogsOverviewLayoutFirstPageBtnItemProps) => {
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

/** Row template `prev_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutPrevPageBtnItemProps {
    layout?: BoxLayout;
    onPrevPageBtn?: () => void;
}

export const LogsOverviewLayoutPrevPageBtnItem = ({ layout, onPrevPageBtn }: LogsOverviewLayoutPrevPageBtnItemProps) => {
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

/** Row template `next_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutNextPageBtnItemProps {
    layout?: BoxLayout;
    onNextPageBtn?: () => void;
}

export const LogsOverviewLayoutNextPageBtnItem = ({ layout, onNextPageBtn }: LogsOverviewLayoutNextPageBtnItemProps) => {
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

/** Row template `last_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutLastPageBtnItemProps {
    layout?: BoxLayout;
    onLastPageBtn?: () => void;
}

export const LogsOverviewLayoutLastPageBtnItem = ({ layout, onLastPageBtn }: LogsOverviewLayoutLastPageBtnItemProps) => {
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
