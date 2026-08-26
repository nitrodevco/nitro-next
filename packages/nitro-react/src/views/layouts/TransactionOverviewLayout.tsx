import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1134_transaction_overview_xml` (layout "transaction_overview", 880x391) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionOverviewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onFirstPageBtn?: () => void;
    onLastPageBtn?: () => void;
    onNextPageBtn?: () => void;
    onPrevPageBtn?: () => void;
    onRefreshBtn?: () => void;
}

export const TransactionOverviewLayout = ({ layout, onClose, onFirstPageBtn, onLastPageBtn, onNextPageBtn, onPrevPageBtn, onRefreshBtn }: TransactionOverviewLayoutProps) => {
    const t = useTranslation();
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('wiredchests.logs.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 880, height: 391, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 880, top: 0, height: 62 }}
                >
                    <Region
                        name="warning_text"
                        params={2185}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, width: 861, top: 10, height: 58, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                    <Region
                        name="key_value_pairs"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 400, top: 13, height: 42, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            name="pair"
                            params={16}
                            layout={{ width: 94, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="list_type_key"
                                params={16}
                                layout={{ width: 57, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.logs.list_type')} />
                            </Region>
                            <Region
                                name="list_type_value"
                                params={16}
                                layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.logs.type.0')} />
                            </Region>
                        </Region>
                        <Region
                            name="pair"
                            params={16}
                            layout={{ width: 93, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="id_key"
                                params={16}
                                layout={{ width: 53, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.logs.chest_id')} />
                            </Region>
                            <Region
                                name="id_value"
                                params={16}
                                layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="12345" />
                            </Region>
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="refresh_btn"
                        params={393297}
                        onPointerTap={onRefreshBtn}
                        layout={{ position: 'absolute', left: 801, width: 62, top: 13, height: 30 }}
                    >
                        {t('wiredchests.logs.refresh')}
                    </Button>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 777, width: 15, top: 20, height: 15 }}
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
                    layout={{ position: 'absolute', left: 1, width: 878, top: 62, height: 234 }}
                >
                    <Region
                        name="table_view"
                        params={2192}
                        layout={{ position: 'absolute', left: 13, width: 852, top: 0, height: 234 }}
                    />
                </Region>
                <Region
                    name="footer"
                    params={1049744}
                    layout={{ position: 'absolute', left: 0, width: 880, top: 296, height: 60 }}
                >
                    <Region
                        name="pagination"
                        params={1168}
                        layout={{ position: 'absolute', left: 0, width: 880, top: 16, height: 30 }}
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
                            layout={{ position: 'absolute', left: 753, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
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
                            layout={{ position: 'absolute', left: 312, width: 256, top: 4, height: 25, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="pagina_text_start"
                                params={16}
                                layout={{ width: 205, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="X transactions found. Showing page " />
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
