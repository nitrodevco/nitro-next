import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `964_habbiconselector_menu_xml` (layout "habbiconselector_menu", 245x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconselectorMenuLayoutProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const HabbiconselectorMenuLayout = ({ layout, onHabbiconOpenHubButton }: HabbiconselectorMenuLayoutProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 245, height: 138, ...layout }}>
            <Border
                variant="2"
                name="habbicon_selector_window"
                params={17}
                tintColor="#24231e"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, width: 245, top: 0, height: 138 }}
            >
                <Region
                    name="top_controls"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9 }}
                >
                    <Border
                        variant="4"
                        name="habbicon_search_border"
                        params={16}
                        layout={{ width: 122, height: 28, flexShrink: 0 }}
                    >
                        <TextInput
                            value={habbiconSearchInputValue}
                            onChange={setHabbiconSearchInputValue}
                            maxLength={24}
                            textColor="#333333"
                            layout={{ position: 'absolute', left: 6, width: 90, top: 5, height: 18 }}
                        />
                        <Region
                            name="habbicon_search_placeholder"
                            params={3216}
                            layout={{ position: 'absolute', left: 6, width: 90, top: 5, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('generic.search')}
                                textStyle="text-style-u-italic"
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                        <Region
                            name="habbicon_search_clear_button"
                            params={3153}
                            layout={{ position: 'absolute', left: 99, width: 17, top: 6, height: 17 }}
                        >
                            <ThemeImage
                                params={2192}
                                src={layoutImage('common_promo_arrow_close.png')}
                                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                            />
                        </Region>
                    </Border>
                    <Button
                        variant="4"
                        name="habbicon_open_hub_button"
                        params={131073}
                        onPointerTap={onHabbiconOpenHubButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                    >
                        {t('habbicons.hud.get_more')}
                    </Button>
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, width: 233, top: 43, height: 88 }}
                >
                    <Region
                        name="habbicon_section_list"
                        params={144}
                        layout={{ flexDirection: 'column', gap: 4, width: '100%' }}
                    >
                        <Region
                            name="habbicon_section_template"
                            params={16}
                            layout={{ width: 217, height: 62, flexShrink: 0 }}
                        >
                            <Region
                                name="section_title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Section"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="habbicon_grid"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 217, top: 20, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                            >
                                <Region
                                    name="habbicon_item_template"
                                    params={17}
                                    layout={{ width: 42, height: 42, flexShrink: 0 }}
                                >
                                    <Border
                                        variant="2"
                                        name="habbicon_item_bg"
                                        params={16}
                                        tintColor="#1f1f1f"
                                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                    />
                                    <ThemeImage
                                        name="habbicon_icon"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 245, top: 40, height: 96 }}
                >
                    <Region
                        name="empty_text"
                        params={3935440}
                        layout={{ position: 'absolute', left: 22, width: 200, top: 40, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('habbicons.no_habbicons')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
