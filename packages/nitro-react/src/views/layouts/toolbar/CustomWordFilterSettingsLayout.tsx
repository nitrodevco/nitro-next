import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `1249_custom_word_filter_settings_xml` (layout "memenu_chat_settings", 242x248) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CustomWordFilterSettingsLayoutProps {
    captionWordFilterTitle?: string;
    layout?: BoxLayout;
    line?: CustomWordFilterSettingsLayoutLineProps;
    onAddBtn?: () => void;
    onBackBtn?: () => void;
    onRemoveBtn?: () => void;
    wordlist?: CustomWordFilterSettingsLayoutWordlistProps;
}

export const CustomWordFilterSettingsLayout = ({ captionWordFilterTitle, layout, line, onAddBtn, onBackBtn, onRemoveBtn, wordlist }: CustomWordFilterSettingsLayoutProps) => {
    const t = useTranslation();
    const [ addWordInputValue, setAddWordInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 242, height: 248, ...layout }}>
            <Border
                variant="6"
                name="word_filter_border"
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 242, top: 1, height: 248, justifyContent: 'center' }}
            >
                <Region
                    name="word_filter_title"
                    params={786640}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 153, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionWordFilterTitle ?? t('word_filter.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <CustomWordFilterSettingsLayoutLine {...line} />
                <Region
                    params={8388624}
                    layout={{ position: 'absolute', left: 10, width: 222, top: 35, height: 203, flexDirection: 'column', gap: 7 }}
                >
                    <Region
                        params={262145}
                        layout={{ width: 222, height: 24, flexShrink: 0 }}
                    >
                        <Border
                            variant="3"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 70, top: 0, height: 24, maxWidth: 160 }}
                        >
                            <TextInput
                                value={addWordInputValue}
                                onChange={setAddWordInputValue}
                                layout={{ position: 'absolute', left: 3, width: 146, top: 4, height: 17, minWidth: 146, maxWidth: 146 }}
                            />
                        </Border>
                        <Button
                            variant="3"
                            name="add_btn"
                            params={393361}
                            onPointerTap={onAddBtn}
                            layout={{ position: 'absolute', left: 157, right: -1, top: 0, height: 24, minWidth: 66, maxWidth: 66 }}
                        >
                            {t('navigator.roomsettings.roomfilter.addword')}
                        </Button>
                    </Region>
                    <Border
                        variant="3"
                        name="wordlist_border"
                        params={16}
                        layout={{ width: 222, height: 100, flexShrink: 0 }}
                    >
                        <CustomWordFilterSettingsLayoutWordlist {...wordlist} />
                    </Border>
                    <Button
                        variant="3"
                        name="remove_btn"
                        params={131089}
                        onPointerTap={onRemoveBtn}
                        layout={{ width: 210, height: 30, flexShrink: 0, maxWidth: 210 }}
                    >
                        {t('navigator.roomsettings.roomfilter.removeword')}
                    </Button>
                    <Button
                        variant="3"
                        name="back_btn"
                        params={1180785}
                        onPointerTap={onBackBtn}
                        layout={{ width: 60, height: 28, flexShrink: 0, minWidth: 60, maxWidth: 60 }}
                    >
                        {t('widget.memenu.back')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `line` of CustomWordFilterSettingsLayout - configured through the parent's `line` prop. */
export interface CustomWordFilterSettingsLayoutLineProps {
    layout?: BoxLayout;
}

export const CustomWordFilterSettingsLayoutLine = ({ layout }: CustomWordFilterSettingsLayoutLineProps) => {
    return (
        <Region
            name="line"
            params={786640}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', width: 162, top: 24, height: 1, ...layout }}
        />
    );
};

/** Named region `bg_region` of CustomWordFilterSettingsLayout - configured through the parent's `bgRegion` prop. */
export interface CustomWordFilterSettingsLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const CustomWordFilterSettingsLayoutBgRegion = ({ layout, onBgRegion }: CustomWordFilterSettingsLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            params={17}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 18, ...layout }}
        />
    );
};

/** Row template `word_filter_list_item` of CustomWordFilterSettingsLayout - pass real rows through its `items…` slot. */
export interface CustomWordFilterSettingsLayoutWordFilterListItemItemProps {
    bgRegion?: CustomWordFilterSettingsLayoutBgRegionProps;
    captionText?: string;
    layout?: BoxLayout;
    visibleWordFilterListItem?: boolean;
}

export const CustomWordFilterSettingsLayoutWordFilterListItemItem = ({ bgRegion, captionText, layout, visibleWordFilterListItem }: CustomWordFilterSettingsLayoutWordFilterListItemItemProps) => {
    return (
        <Region
            name="word_filter_list_item"
            params={16}
            visible={visibleWordFilterListItem ?? false}
            backgroundColor="#ff00ff"
            layout={{ width: 213, height: 18, flexShrink: 0, ...layout }}
        >
            <CustomWordFilterSettingsLayoutBgRegion {...bgRegion} />
            <Region
                name="text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionText ?? 'BadWord'} />
            </Region>
        </Region>
    );
};

/** Named region `wordlist` of CustomWordFilterSettingsLayout - configured through the parent's `wordlist` prop. */
export interface CustomWordFilterSettingsLayoutWordlistProps {
    itemsWordlist?: ReactNode;
    layout?: BoxLayout;
}

export const CustomWordFilterSettingsLayoutWordlist = ({ itemsWordlist, layout }: CustomWordFilterSettingsLayoutWordlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, right: 4, top: 4, bottom: 3, ...layout }}
        >
            <Region
                name="wordlist"
                params={2192}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsWordlist ?? (
                    <CustomWordFilterSettingsLayoutWordFilterListItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};
