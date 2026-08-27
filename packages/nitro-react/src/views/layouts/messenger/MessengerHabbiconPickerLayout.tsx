import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3108_messenger_habbicon_picker_xml` (layout "messenger_habbicon_picker", 256x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerHabbiconPickerLayoutProps {
    captionEmptyText?: string;
    itemsHabbiconSectionList?: ReactNode;
    itemsTopControls?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayout = ({ captionEmptyText, itemsHabbiconSectionList, itemsTopControls, layout }: MessengerHabbiconPickerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 256, height: 138, ...layout }}>
            <Border
                variant="107"
                name="messenger_habbicon_picker_window"
                params={1048577}
                layout={{ position: 'absolute', left: 0, width: 256, bottom: 0, height: 138 }}
            >
                <Region
                    name="top_controls"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9 }}
                >
                    {itemsTopControls ?? (
                        <>
                            <MessengerHabbiconPickerLayoutHabbiconSearchBorderItem />
                            <MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem />
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
                            <MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem />
                        )}
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 2 }}
                >
                    <Region
                        name="empty_text"
                        params={3935440}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -100, width: 200, top: '50%', marginTop: -8, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('habbicons.no_habbicons')}
                            textStyle="text-style-il-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `habbicon_search_border` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconSearchBorderItemProps {
    captionHabbiconSearchPlaceholder?: string;
    layout?: BoxLayout;
    onHabbiconSearchClearButton?: () => void;
}

export const MessengerHabbiconPickerLayoutHabbiconSearchBorderItem = ({ captionHabbiconSearchPlaceholder, layout, onHabbiconSearchClearButton }: MessengerHabbiconPickerLayoutHabbiconSearchBorderItemProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Border
            variant="105"
            name="habbicon_search_border"
            params={16}
            layout={{ width: 143, height: 24, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={habbiconSearchInputValue}
                onChange={setHabbiconSearchInputValue}
                maxLength={24}
                textColor="#333333"
                layout={{ position: 'absolute', left: 6, right: 26, top: 4, height: 17 }}
            />
            <Region
                name="habbicon_search_placeholder"
                params={144}
                layout={{ position: 'absolute', left: 6, right: 26, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabbiconSearchPlaceholder ?? t('generic.search')}
                    textOptions={{ fill: '#888888' }}
                />
            </Region>
            <Region
                name="habbicon_search_clear_button"
                params={3153}
                onPointerTap={onHabbiconSearchClearButton}
                cursor="pointer"
                layout={{ position: 'absolute', right: 6, width: 17, top: '50%', marginTop: -8, height: 17 }}
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

/** Row template `habbicon_open_hub_button` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItemProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem = ({ layout, onHabbiconOpenHubButton }: MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="habbicon_open_hub_button"
            params={131073}
            onPointerTap={onHabbiconOpenHubButton}
            textStyle="text-style-il-button"
            layout={{ width: 90, height: 24, flexShrink: 0, minWidth: 90, maxWidth: 90, ...layout }}
        >
            {t('habbicons.hud.get_more')}
        </Button>
    );
};

/** Row template `habbicon_item_template` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconItemTemplateItemProps {
    layout?: BoxLayout;
    onHabbiconItemTemplate?: () => void;
    srcHabbiconIcon?: string;
}

export const MessengerHabbiconPickerLayoutHabbiconItemTemplateItem = ({ layout, onHabbiconItemTemplate, srcHabbiconIcon }: MessengerHabbiconPickerLayoutHabbiconItemTemplateItemProps) => {
    return (
        <Region
            name="habbicon_item_template"
            params={17}
            onPointerTap={onHabbiconItemTemplate}
            cursor="pointer"
            layout={{ width: 44, height: 45, flexShrink: 0, ...layout }}
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
                src={srcHabbiconIcon}
                layout={{ position: 'absolute', left: 2, width: 40, top: 2, height: 40 }}
            />
        </Region>
    );
};

/** Row template `habbicon_section_template` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps {
    captionSectionTitle?: string;
    itemsHabbiconGrid?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem = ({ captionSectionTitle, itemsHabbiconGrid, layout }: MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps) => {
    return (
        <Region
            name="habbicon_section_template"
            params={16}
            layout={{ width: 230, height: 65, flexShrink: 0, ...layout }}
        >
            <Region
                name="section_title"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSectionTitle ?? 'Section'}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <Region
                name="habbicon_grid"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 230, top: 20, height: 45, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
            >
                {itemsHabbiconGrid ?? (
                    <MessengerHabbiconPickerLayoutHabbiconItemTemplateItem />
                )}
            </Region>
        </Region>
    );
};
