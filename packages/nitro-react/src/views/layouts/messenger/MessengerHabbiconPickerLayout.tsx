import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3108_messenger_habbicon_picker_xml` (layout "messenger_habbicon_picker", 256x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerHabbiconPickerLayoutProps {
    emptyView?: MessengerHabbiconPickerLayoutEmptyViewProps;
    habbiconSectionList?: MessengerHabbiconPickerLayoutHabbiconSectionListProps;
    layout?: BoxLayout;
    topControls?: MessengerHabbiconPickerLayoutTopControlsProps;
}

export const MessengerHabbiconPickerLayout = ({ emptyView, habbiconSectionList, layout, topControls }: MessengerHabbiconPickerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 256, height: 138, ...layout }}>
            <Border
                variant="107"
                name="messenger_habbicon_picker_window"
                layout={{ position: 'absolute', left: 0, width: 256, bottom: 0, height: 138 }}
            >
                <MessengerHabbiconPickerLayoutTopControls {...topControls} />
                <MessengerHabbiconPickerLayoutHabbiconSectionList {...habbiconSectionList} />
                <MessengerHabbiconPickerLayoutEmptyView {...emptyView} />
            </Border>
        </Region>
    );
};

/** Named region `habbicon_search_clear_button` of MessengerHabbiconPickerLayout - configured through the parent's `habbiconSearchClearButton` prop. */
export interface MessengerHabbiconPickerLayoutHabbiconSearchClearButtonProps {
    layout?: BoxLayout;
    onHabbiconSearchClearButton?: () => void;
}

export const MessengerHabbiconPickerLayoutHabbiconSearchClearButton = ({ layout, onHabbiconSearchClearButton }: MessengerHabbiconPickerLayoutHabbiconSearchClearButtonProps) => {
    return (
        <Region
            name="habbicon_search_clear_button"
            onPointerTap={onHabbiconSearchClearButton}
            cursor="pointer"
            layout={{ position: 'absolute', right: 6, width: 17, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_promo_arrow_close.png')}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Row template `habbicon_search_border` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconSearchBorderItemProps {
    captionHabbiconSearchPlaceholder?: string;
    habbiconSearchClearButton?: MessengerHabbiconPickerLayoutHabbiconSearchClearButtonProps;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutHabbiconSearchBorderItem = ({ captionHabbiconSearchPlaceholder, habbiconSearchClearButton, layout }: MessengerHabbiconPickerLayoutHabbiconSearchBorderItemProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Border
            variant="105"
            name="habbicon_search_border"
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
                layout={{ position: 'absolute', left: 6, right: 26, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHabbiconSearchPlaceholder ?? t('generic.search')}
                    textOptions={{ fill: '#888888' }}
                />
            </Region>
            <MessengerHabbiconPickerLayoutHabbiconSearchClearButton {...habbiconSearchClearButton} />
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
            onPointerTap={onHabbiconOpenHubButton}
            textStyle="text-style-il-button"
            layout={{ width: 90, height: 24, flexShrink: 0, minWidth: 90, maxWidth: 90, ...layout }}
        >
            {t('habbicons.hud.get_more')}
        </Button>
    );
};

/** Named region `top_controls` of MessengerHabbiconPickerLayout - configured through the parent's `topControls` prop. */
export interface MessengerHabbiconPickerLayoutTopControlsProps {
    itemsTopControls?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutTopControls = ({ itemsTopControls, layout }: MessengerHabbiconPickerLayoutTopControlsProps) => {
    return (
        <Region
            name="top_controls"
            layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9, ...layout }}
        >
            {itemsTopControls ?? (
                <>
                    <MessengerHabbiconPickerLayoutHabbiconSearchBorderItem />
                    <MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem />
                </>
            )}
        </Region>
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
            onPointerTap={onHabbiconItemTemplate}
            cursor="pointer"
            layout={{ width: 44, height: 45, flexShrink: 0, ...layout }}
        >
            <Border
                variant="104"
                name="habbicon_item_bg"
                tintColor="#dddddd"
                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 45 }}
            />
            <ThemeImage
                name="habbicon_icon"
                src={srcHabbiconIcon}
                layout={{ position: 'absolute', left: 2, width: 40, top: 2, height: 40 }}
            />
        </Region>
    );
};

/** Named region `habbicon_grid` of MessengerHabbiconPickerLayout - configured through the parent's `habbiconGrid` prop. */
export interface MessengerHabbiconPickerLayoutHabbiconGridProps {
    itemsHabbiconGrid?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutHabbiconGrid = ({ itemsHabbiconGrid, layout }: MessengerHabbiconPickerLayoutHabbiconGridProps) => {
    return (
        <Region
            name="habbicon_grid"
            layout={{ position: 'absolute', left: 0, width: 230, top: 20, height: 45, flexDirection: 'row', flexWrap: 'wrap', gap: 2, ...layout }}
        >
            {itemsHabbiconGrid ?? (
                <MessengerHabbiconPickerLayoutHabbiconItemTemplateItem />
            )}
        </Region>
    );
};

/** Row template `habbicon_section_template` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps {
    captionSectionTitle?: string;
    habbiconGrid?: MessengerHabbiconPickerLayoutHabbiconGridProps;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem = ({ captionSectionTitle, habbiconGrid, layout }: MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps) => {
    return (
        <Region
            name="habbicon_section_template"
            layout={{ width: 230, height: 65, flexShrink: 0, ...layout }}
        >
            <Region
                name="section_title"
                layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSectionTitle ?? 'Section'}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <MessengerHabbiconPickerLayoutHabbiconGrid {...habbiconGrid} />
        </Region>
    );
};

/** Named region `habbicon_section_list` of MessengerHabbiconPickerLayout - configured through the parent's `habbiconSectionList` prop. */
export interface MessengerHabbiconPickerLayoutHabbiconSectionListProps {
    itemsHabbiconSectionList?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutHabbiconSectionList = ({ itemsHabbiconSectionList, layout }: MessengerHabbiconPickerLayoutHabbiconSectionListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 6, top: 43, height: 88, ...layout }}
        >
            <Region
                name="habbicon_section_list"
                layout={{ flexDirection: 'column', gap: 4, width: '100%' }}
            >
                {itemsHabbiconSectionList ?? (
                    <MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `empty_view` of MessengerHabbiconPickerLayout - configured through the parent's `emptyView` prop. */
export interface MessengerHabbiconPickerLayoutEmptyViewProps {
    captionEmptyText?: string;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayoutEmptyView = ({ captionEmptyText, layout }: MessengerHabbiconPickerLayoutEmptyViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="empty_view"
            layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 2, justifyContent: 'center', ...layout }}
        >
            <Region
                name="empty_text"
                layout={{ position: 'absolute', width: 200, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionEmptyText ?? t('habbicons.no_habbicons')}
                    textStyle="text-style-il-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                />
            </Region>
        </Region>
    );
};
