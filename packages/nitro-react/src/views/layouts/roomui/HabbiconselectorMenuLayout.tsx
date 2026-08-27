import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `964_habbiconselector_menu_xml` (layout "habbiconselector_menu", 245x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconselectorMenuLayoutProps {
    captionEmptyText?: string;
    itemsHabbiconSectionList?: ReactNode;
    itemsTopControls?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconselectorMenuLayout = ({ captionEmptyText, itemsHabbiconSectionList, itemsTopControls, layout }: HabbiconselectorMenuLayoutProps) => {
    const t = useTranslation();

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
                    {itemsTopControls ?? (
                        <>
                            <HabbiconselectorMenuLayoutHabbiconSearchBorderItem />
                            <HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem />
                        </>
                    )}
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, right: 6, top: 43, height: 88 }}
                >
                    <Region
                        name="habbicon_section_list"
                        params={144}
                        layout={{ flexDirection: 'column', gap: 4, width: '100%' }}
                    >
                        {itemsHabbiconSectionList ?? (
                            <HabbiconselectorMenuLayoutHabbiconSectionTemplateItem />
                        )}
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 2, justifyContent: 'center' }}
                >
                    <Region
                        name="empty_text"
                        params={3935440}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 200, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('habbicons.no_habbicons')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `habbicon_search_border` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconSearchBorderItemProps {
    captionHabbiconSearchPlaceholder?: string;
    layout?: BoxLayout;
    onHabbiconSearchClearButton?: () => void;
}

export const HabbiconselectorMenuLayoutHabbiconSearchBorderItem = ({ captionHabbiconSearchPlaceholder, layout, onHabbiconSearchClearButton }: HabbiconselectorMenuLayoutHabbiconSearchBorderItemProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Border
            variant="4"
            name="habbicon_search_border"
            params={16}
            layout={{ width: 122, height: 28, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={habbiconSearchInputValue}
                onChange={setHabbiconSearchInputValue}
                maxLength={24}
                textColor="#333333"
                layout={{ position: 'absolute', left: 6, right: 26, alignSelf: 'center', height: 18 }}
            />
            <Region
                name="habbicon_search_placeholder"
                params={3216}
                layout={{ position: 'absolute', left: 6, right: 26, alignSelf: 'center', height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabbiconSearchPlaceholder ?? t('generic.search')}
                    textStyle="text-style-u-italic"
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
            <Region
                name="habbicon_search_clear_button"
                params={3153}
                onPointerTap={onHabbiconSearchClearButton}
                cursor="pointer"
                layout={{ position: 'absolute', right: 6, width: 17, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17 }}
            >
                <ThemeImage
                    params={2192}
                    src={layoutImage('common_promo_arrow_close.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `habbicon_open_hub_button` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconOpenHubButtonItemProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem = ({ layout, onHabbiconOpenHubButton }: HabbiconselectorMenuLayoutHabbiconOpenHubButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="4"
            name="habbicon_open_hub_button"
            params={131073}
            onPointerTap={onHabbiconOpenHubButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('habbicons.hud.get_more')}
        </Button>
    );
};

/** Row template `habbicon_item_template` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconItemTemplateItemProps {
    layout?: BoxLayout;
    onHabbiconItemTemplate?: () => void;
    srcHabbiconIcon?: string;
}

export const HabbiconselectorMenuLayoutHabbiconItemTemplateItem = ({ layout, onHabbiconItemTemplate, srcHabbiconIcon }: HabbiconselectorMenuLayoutHabbiconItemTemplateItemProps) => {
    return (
        <Region
            name="habbicon_item_template"
            params={17}
            onPointerTap={onHabbiconItemTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
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
                src={srcHabbiconIcon}
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
            />
        </Region>
    );
};

/** Row template `habbicon_section_template` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconSectionTemplateItemProps {
    captionSectionTitle?: string;
    itemsHabbiconGrid?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconselectorMenuLayoutHabbiconSectionTemplateItem = ({ captionSectionTitle, itemsHabbiconGrid, layout }: HabbiconselectorMenuLayoutHabbiconSectionTemplateItemProps) => {
    return (
        <Region
            name="habbicon_section_template"
            params={16}
            layout={{ width: 217, height: 62, flexShrink: 0, ...layout }}
        >
            <Region
                name="section_title"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSectionTitle ?? 'Section'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="habbicon_grid"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 217, top: 20, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
            >
                {itemsHabbiconGrid ?? (
                    <HabbiconselectorMenuLayoutHabbiconItemTemplateItem />
                )}
            </Region>
        </Region>
    );
};
