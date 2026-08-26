import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `3108_messenger_habbicon_picker_xml` (layout "messenger_habbicon_picker", 256x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerHabbiconPickerLayoutProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const MessengerHabbiconPickerLayout = ({ layout, onHabbiconOpenHubButton }: MessengerHabbiconPickerLayoutProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 256, height: 138, ...layout }}>
            <Border
                variant="107"
                name="messenger_habbicon_picker_window"
                params={1048577}
                layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 138 }}
            >
                <Region
                    name="top_controls"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9 }}
                >
                    <Border
                        variant="105"
                        name="habbicon_search_border"
                        params={16}
                        layout={{ width: 143, height: 24, flexShrink: 0 }}
                    >
                        <TextInput
                            value={habbiconSearchInputValue}
                            onChange={setHabbiconSearchInputValue}
                            maxLength={24}
                            textColor="#333333"
                            layout={{ position: 'absolute', left: 6, width: 111, top: 4, height: 17 }}
                        />
                        <Region
                            name="habbicon_search_placeholder"
                            params={144}
                            layout={{ position: 'absolute', left: 6, width: 111, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('generic.search')}
                                textOptions={{ fill: '#888888' }}
                            />
                        </Region>
                        <Region
                            name="habbicon_search_clear_button"
                            params={3153}
                            layout={{ position: 'absolute', left: 120, width: 17, top: 4, height: 17 }}
                        >
                            <ThemeImage
                                params={2192}
                                src={layoutImage('common_promo_arrow_close.png')}
                                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                            />
                        </Region>
                    </Border>
                    <Button
                        variant="102"
                        name="habbicon_open_hub_button"
                        params={131073}
                        onPointerTap={onHabbiconOpenHubButton}
                        textStyle="text-style-il-button"
                        layout={{ width: 90, height: 24, flexShrink: 0, minWidth: 90, maxWidth: 90 }}
                    >
                        {t('habbicons.hud.get_more')}
                    </Button>
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, width: 244, top: 43, height: 88 }}
                >
                    <Region
                        name="habbicon_section_list"
                        params={144}
                        layout={{ flexDirection: 'column', gap: 4, width: '100%' }}
                    >
                        <Region
                            name="habbicon_section_template"
                            params={16}
                            layout={{ width: 230, height: 65, flexShrink: 0 }}
                        >
                            <Region
                                name="section_title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Section"
                                    textStyle="text-style-il-regular"
                                />
                            </Region>
                            <Region
                                name="habbicon_grid"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 230, top: 20, height: 45, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                            >
                                <Region
                                    name="habbicon_item_template"
                                    params={17}
                                    layout={{ width: 44, height: 45, flexShrink: 0 }}
                                >
                                    <Border
                                        variant="104"
                                        name="habbicon_item_bg"
                                        params={16}
                                        tintColor="#dddddd"
                                        layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 45 }}
                                    />
                                    <ThemeImage
                                        name="habbicon_icon"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 2, width: 40, top: 2, height: 40 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 40, height: 96 }}
                >
                    <Region
                        name="empty_text"
                        params={3935440}
                        layout={{ position: 'absolute', left: 28, width: 200, top: 40, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('habbicons.no_habbicons')}
                            textStyle="text-style-il-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
